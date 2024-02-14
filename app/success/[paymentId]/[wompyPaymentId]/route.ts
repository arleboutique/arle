import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";
import { sendInvoiceEmail } from "../actions";

export const GET = async (
  req: Request,
  { params }: { params: { paymentId: string; wompyPaymentId: string } }
) => {
  if (!req || !req.url) return Response.json({ message: "no req" });

  const url = req.url;
  // const { searchParams } = new URL(req.url);
  const { wompyPaymentId } = params;

  const wompyQueryUrl = `https://${process.env.WOMPI_ENV}.wompi.co/v1/transactions/${wompyPaymentId}`;

  try {
    const wompyResponse = await fetch(wompyQueryUrl);

    const wompyJson = await wompyResponse.json();

    if (wompyJson.error) {
      return Response.json({
        wompyJson,
        wompyQueryUrl,
        wompyPaymentId,
        urlString: new URL(req.url).toString(),
        url,
        req,
      });
    }

    if (wompyJson.data.status === "APPROVED") {
      const sanityOrder = await sanityClient.fetch(
        `*[_type == "orders" && _id == $id][0]`,
        { id: params.paymentId }
      );

      const newSanityOrder = {
        ...sanityOrder,
        status: "PAID",
        wompiReference: wompyJson.data.id,
      };

      await sanityWriteClient
        .patch(newSanityOrder._id)
        .set(newSanityOrder)
        .commit();

      const urlSegments = req.url.split("/");
      urlSegments?.pop();
      const responseUrl = urlSegments?.join("/");
      const { data, error } = await sendInvoiceEmail(newSanityOrder);
      console.log("after running sendInvoice Email", {
        data,
        error,
        responseUrl,
      });

      if (error || !data) {
        console.log("error sending email", error, newSanityOrder);
        return Response.redirect(`${responseUrl}?error=error-sending-email`);
      }

      return Response.redirect(responseUrl);
    }

    return Response.json({
      url: `${req.url.split("/success")[0]}/error-procesando-pago`,
      wompyJson,
      wompyQueryUrl,
    });
  } catch (error) {
    console.error({ error });
    return Response.json({
      url: `${req.url.split("/success")[0]}/error-procesando-pago`,
      error,
      wompyQueryUrl,
      inCatch: true,
    });
  }
};
