import {expect, test} from 'vitest';
import {callCompositor, serializeCommand} from '../compositor/compose';
import {startLongRunningCompositor} from '../compositor/compositor';

test('Should get Rust errors in a good way', async () => {
	const compositor = startLongRunningCompositor({
		maximumFrameCacheItemsInBytes: null,
		logLevel: 'info',
		indent: false,
	});

	try {
		await compositor.executeCommand('ExtractFrame', {
			src: 'invlaid',
			original_src: 'invlaid',
			time: 1,
			transparent: false,
		});
	} catch (err) {
		expect((err as Error).message).toContain(
			'Compositor error: No such file or directory',
		);
		expect((err as Error).message).toContain(
			'remotion::opened_stream::open_stream',
		);
	}
});

test('Handle panics', async () => {
	const compositor = startLongRunningCompositor({
		maximumFrameCacheItemsInBytes: null,
		logLevel: 'info',
		indent: false,
	});

	try {
		await compositor.executeCommand('DeliberatePanic', {});
	} catch (err) {
		expect((err as Error).message).toContain('Compositor panicked');
		expect(
			(err as Error).message.includes(['rust', 'commands', 'mod'].join('/')) ||
				(err as Error).message.includes(['rust', 'commands', 'mod'].join('\\')),
		).toBeTruthy();
	}

	try {
		await compositor.executeCommand('DeliberatePanic', {});
		throw new Error('should not be reached');
	} catch (err) {
		expect((err as Error).message).toContain('Compositor quit: thread');
	}

	try {
		await compositor.finishCommands();
		throw new Error('should not be reached');
	} catch (err) {
		expect((err as Error).message).toContain('Compositor quit');
	}

	try {
		await compositor.waitForDone();
		throw new Error('should not be reached');
	} catch (err) {
		expect((err as Error).message).toContain('Compositor quit');
	}
});

test('Non-long running task panics should be handled', async () => {
	const command = serializeCommand('DeliberatePanic', {});

	try {
		await callCompositor(JSON.stringify(command), false, 'info');
		throw new Error('should not be reached');
	} catch (err) {
		expect((err as Error).message).toContain('Compositor panicked');
		expect((err as Error).message).toContain("thread 'main' panicked");
	}
});

test('Long running task failures should be handled', async () => {
	const command = serializeCommand('ExtractFrame', {
		src: 'fsdfds',
		original_src: 'fsdfds',
		time: 1,
		transparent: false,
	});
	try {
		await callCompositor(JSON.stringify(command), false, 'info');
		throw new Error('should not be reached');
	} catch (err) {
		expect((err as Error).message).toContain(
			'Compositor error: No such file or directory',
		);
		expect((err as Error).stack).toContain(
			'remotion::opened_stream::open_stream',
		);
	}
});

test('Invalid payloads will be handled', async () => {
	// @ts-expect-error
	const command = serializeCommand('ExtractFrame', {
		src: 'fsdfds',
		original_src: 'fsdfds',
	});
	try {
		await callCompositor(JSON.stringify(command), false, 'info');
	} catch (err) {
		expect((err as Error).message).toContain(
			'Compositor error: missing field `time`',
		);
	}
});
