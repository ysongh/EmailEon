import { resolveAddress } from '@mailchain/sdk/internal';

const GET = async() => {
	const address = '0xAee9318c9608658cc3a89383B234e130061FFB20@ethereum.mailchain.com';
	const { error: resolveAddressError } = await resolveAddress(address);
	if (resolveAddressError) {
		const { type, message } = resolveAddressError;
		console.warn(`ERROR check address - ${address} - ${type} - ${message}`);
        return Response.json({ msg: `ERROR check address - ${address} - ${type} - ${message}` });
	}

	console.log(`${address} is reachable.`);
    return Response.json({ msg: `${address} is reachable.` });
  }

export { GET };