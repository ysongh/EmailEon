import { Mailchain } from '@mailchain/sdk';

const POST = async(req: Request) => {
	const { subject, message, toEmail } = await req.json();
  const secretRecoveryPhrase = process.env.SECRET_RECOVERY_PHRASE!; // 25 word mnemonicPhrase

  const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);

  const { data, error } = await mailchain.sendMail({
      from: `emaileon@mailchain.com`, // sender address
      to: [toEmail], // list of recipients (blockchain or mailchain addresses)
      subject: subject, // subject line
      content: {
          text: message, // plain text body
          html: `<p>${message}</p>`, // html body
      },
  });
  if (error) {
      // handle error
      console.warn('Mailchain error', error);
      return;
  }
  // handle success send mail result
  console.log(data);
  return Response.json({ data: data });
  }

export { POST };