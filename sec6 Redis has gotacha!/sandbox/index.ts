import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
	await client.hSet('car', {
		color: 'red',
		year: 1950,
		engine: { cylinders: 8 }, //* it will be '[object Object]'
		owner: null || '', //* can't store null null.toString()
		service: undefined || '' //* same as null
	});

	//* not exist
	const notExist = await client.hGetAll('car#123');
	const car = await client.hGetAll('car');
	console.log(car);
	if (Object.keys(notExist).length === 0) {
		console.log('Car not found, respond with 404');
		return;
	}
	console.log(notExist); //* it will return {}
};
run();
