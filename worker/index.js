import { AutoRouter } from 'itty-router';

const router = AutoRouter();

router.get('/worker/hello', async () => 'Hello World!');

export default { ...router };
