import type {JobProgressCallback, RenderJob} from '@remotion/studio-server';
import {getRendererPortFromConfigFile} from '../config/preview-server';
import {convertEntryPointToServeUrl} from '../convert-entry-point-to-serve-url';
import {getCliOptions} from '../get-cli-options';
import {renderStillFlow} from '../render-flows/still';

export const processStill = async ({
	job,
	remotionRoot,
	entryPoint,
	onProgress,
	addCleanupCallback,
}: {
	job: RenderJob;
	remotionRoot: string;
	entryPoint: string;
	onProgress: JobProgressCallback;
	addCleanupCallback: (cb: () => void) => void;
}) => {
	if (job.type !== 'still') {
		throw new Error('Expected still job');
	}

	const {publicDir, browserExecutable, puppeteerTimeout} = getCliOptions({
		isLambda: false,
		type: 'still',
		remotionRoot,
		logLevel: job.logLevel,
	});

	const fullEntryPoint = convertEntryPointToServeUrl(entryPoint);

	await renderStillFlow({
		remotionRoot,
		browser: 'chrome',
		browserExecutable,
		chromiumOptions: job.chromiumOptions,
		entryPointReason: 'same as Studio',
		envVariables: job.envVariables,
		height: null,
		fullEntryPoint,
		serializedInputPropsWithCustomSchema:
			job.serializedInputPropsWithCustomSchema,
		overwrite: true,
		port: getRendererPortFromConfigFile(),
		publicDir,
		puppeteerTimeout,
		jpegQuality: job.jpegQuality,
		remainingArgs: [],
		scale: job.scale,
		stillFrame: job.frame,
		width: null,
		compositionIdFromUi: job.compositionId,
		imageFormatFromUi: job.imageFormat,
		logLevel: job.logLevel,
		onProgress,
		indent: true,
		addCleanupCallback,
		cancelSignal: job.cancelToken.cancelSignal,
		outputLocationFromUi: job.outName,
		offthreadVideoCacheSizeInBytes: job.offthreadVideoCacheSizeInBytes,
	});
};
