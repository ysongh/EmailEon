import { Mailchain } from '@mailchain/sdk';

const GET = async() => {
  const secretRecoveryPhrase = process.env.SECRET_RECOVERY_PHRASE!; // 25 word mnemonicPhrase

  const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);

  const { data, error } = await mailchain.sendMail({
      from: `emaileon@mailchain.com`, // sender address
      to: [`songweb@mailchain.com`], // list of recipients (blockchain or mailchain addresses)
      subject: 'My first message', // subject line
      content: {
          text: 'Hello Mailchain 👋', // plain text body
          html: '<p>Hello Mailchain 👋</p>', // html body
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

export { GET };