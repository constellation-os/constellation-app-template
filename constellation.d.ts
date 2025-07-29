export {}

declare function getTextWidth(text: string, size?: number, fontFamily?: string): number;

declare global {
    interface Window {
        windows: GraphicalWindow[];
    }
}
declare class GraphicalWindow {
    #private;
    constructor(name: string, Application: Application);
    name: string;
    shortname?: string;
    container: HTMLElement;
    body: HTMLElement;
    header: HTMLElement;
    buttons: HTMLElement;
    closeButton: HTMLElement;
    maximiseButton: HTMLElement;
    minimiseButton: HTMLElement;
    title: HTMLElement;
    iconDiv: HTMLElement;
    readonly winID: number;
    Application: Application;
    resizeObserver: ResizeObserver;
    iconName: string;
    reposition(): void;
    move(x?: number, y?: number, z?: number): void;
    resize(width?: number, height?: number): void;
    show(): void;
    hide(): void;
    showHeader(): void;
    hideHeader(): void;
    square(): void;
    unsquare(): void;
    get minimised(): boolean;
    set minimised(value: boolean);
    minimise(): void;
    unminimise(): void;
    fullscreen(): void;
    unfullscreen(): void;
    get fullscreened(): boolean;
    set fullscreened(value: boolean);
    visible: boolean;
    dimensions: {
        width: number;
        height: number;
    };
    position: {
        left: number;
        top: number;
        zIndex: number;
    };
    rename(name: string): void;
    setIcon(loc: string): Promise<void>;
    remove(): void;
    close(): void;
}

declare class uiKitCreators {
    #private;
    textboxElem: HTMLInputElement | HTMLTextAreaElement | undefined;
    hasTextbox: boolean;
    constructor(parent: Renderer, window: GraphicalWindow);
    uikitIcon: (x?: number, y?: number, name?: string, scale?: number) => HTMLElement;
    uikitText: (x: number, y: number, string: string, size: number) => HTMLParagraphElement;
    uikitButton: (x: number, y: number, string: string, leftClickCallback: () => void, rightClickCallback: () => void, size: number) => HTMLButtonElement;
    uikitTextbox: (x?: number, y?: number, width?: number, height?: number, backtext?: string, callbacks?: {
        update: (key: string, value: string) => void;
        enter: (value: string) => void;
    }, options?: uikitTextboxConfig) => HTMLInputElement;
    uikitVerticalLine: (x: number, y: number, height: number) => HTMLDivElement;
    uikitHorizontalLine: (x: number, y: number, width: number) => HTMLDivElement;
    uikitProgressBar: (x: number, y: number, width: number, height: number, progress: number | "throb") => HTMLDivElement;
    uikitTextarea: (x: number, y: number, width: number, height: number, callbacks: any, options?: uikitTextareaConfig) => HTMLTextAreaElement;
    uikitBox: (x?: number, y?: number, width?: number, height?: number, config?: uikitBoxConfig | undefined) => HTMLDivElement;
    uikitCanvas2D: (x: number, y: number, width: number, height: number, renderingSteps: canvasRenderingStep[], options: uikitCanvasOptions) => HTMLCanvasElement;
}

type uikitCreatorName = {
    [K in keyof uiKitCreators]: K extends `uikit${string}` ? K : never;
}[keyof uiKitCreators];
interface onClickOptions {
    scale?: number;
    origin?: string;
}
interface clickReference extends onClickOptions {
    left?: Function;
    right?: Function;
}
interface step {
    type: uikitCreatorName;
    args: any[];
    onClick?: clickReference;
}
interface textboxCallbackObject {
    update?: Function;
    enter?: Function;
}
interface canvasRenderingStep {
    type: "line" | "rectangle" | "text" | "image";
    data: any;
}
type uikitTextboxConfig = {
    isInvisible?: boolean;
    isEmpty?: boolean;
    fontSize?: number;
    disableMobileAutocorrect?: boolean;
};
type uikitTextareaConfig = {
    isInvisible?: boolean;
    isEmpty?: boolean;
    disableMobileAutocorrect: boolean;
};
type uikitBoxConfig = {
    borderRadius?: number | string;
    background?: string;
};
type uikitCanvasOptions = {
    colour: string;
};
type canvasPosition = {
    x: number;
    y: number;
};

declare class canvasKit {
    #private;
    constructor(steps: step[]);
    line(canvasID: number, colour: string, startingPosition: canvasPosition, ...otherPositions: canvasPosition[]): void;
    box(canvasID: number, position1: canvasPosition, position2: canvasPosition, borderColour: string, backgroundColour: string): void;
    image(canvasID: number, position: canvasPosition, width: number, height: number, url: string): void;
}

// class
declare class Renderer {
    #private;
    defaultConfig: {
        uikitTextbox: uikitTextboxConfig;
        uikitTextarea: uikitTextareaConfig;
        uikitBox: uikitBoxConfig;
        uikitCanvasStep: uikitCanvasOptions;
    };
    elemID: number;
    // add abort controller to remove event listeners
    controller: AbortController;
    signal: AbortSignal;
    // window stuff
    windowWidth: number;
    windowHeight: number;
    resizeWindow(width: number, height: number): void;
    windowX: number;
    windowY: number;
    moveWindow(x?: number, y?: number, z?: number): void;
    set windowName(name: string);
    get windowName(): string;
    get windowShortName(): string | undefined;
    set windowShortName(name: string | undefined);
    readonly setIcon: (name: string) => void;
    makeWindowInvisible(): void;
    makeWindowVisible(): void;
    hideWindowCorners(): void;
    showWindowCorners(): void;
    hideWindowHeader(): void;
    showWindowHeader(): void;
    minimiseWindow(): void;
    restoreWindow(): void;
    maximiseWindow(): void;
    canvas: canvasKit;
    constructor(process: Process);
    clear: () => void;
    readonly icon: (x?: number, y?: number, name?: string, scale?: number) => number;
    readonly text: (x: number, y: number, string: string, size?: number) => number;
    readonly button: (x: number, y: number, string: string, leftClickCallback?: Function, rightClickCallback?: Function, size?: number) => number;
    readonly textbox: (x: number, y: number, width: number, height: number, backtext: string, callbacks: textboxCallbackObject, options?: uikitTextboxConfig) => number;
    readonly verticalLine: (x: number, y: number, height: number) => number;
    readonly horizontalLine: (x: number, y: number, width: number) => number;
    readonly progressBar: (x: number, y: number, width: number, height: number, progress: number | "throb") => number;
    readonly textarea: (x: number, y: number, width: number, height: number, callbacks: textboxCallbackObject, options?: uikitTextareaConfig) => number;
    readonly box: (x: number, y: number, width: number, height: number, config?: uikitBoxConfig | undefined) => number;
    readonly canvas2D: (x: number, y: number, width: number, height: number) => number;
    onClick(elemID: number, leftClickCallback?: Function, rightClickCallback?: Function, otherConfig?: onClickOptions): void;
    awaitClick(callback: () => void | Promise<void>): Promise<void>;
    readonly getTextWidth: typeof getTextWidth;
    readonly setTextboxContent: (content: string) => void;
    readonly getTextboxContent: () => string | null;
    readonly setContextMenu: (x: number, y: number, header: string, buttons: Record<string, Function>) => void;
    readonly removeContextMenu: () => void;
    redraw: () => void;
    /**
     * Commits all UI elements since the last `renderer.clear()` call.
     */
    readonly commit: () => void;
    terminate(): void;
}

type replyCallback = (data: any) => void | undefined;
declare class IPCMessage {
    #private;
    origin: `${string}:${number}`;
    originDirectory: string;
    target: number;
    data: any;
    intent: string;
    hasReplyCallback: boolean;
    constructor(originDirectory: string, originID: number, target: number, intent: string, data: any, replyCallback?: replyCallback);
    reply(data: any): void;
}

interface ProgramManifest {
    name: string;
    description: string;
    category: "Productivity" | "Developer" | "Entertainment" | "Music" | "Games" | "Graphics and Design" | "Social" | "Weather" | "Utilities";
    author: string;
    version: number;
    icon?: string;
    dependencies?: string[];
    /**
     * Whether this application should be exposed to the user and displayed in search etc.
     */
    userspace?: boolean;
}
declare class Framework {
    constructor(directory: string, args: any[]);
    readonly directory: string;
    readonly id: number;
    readonly identifier: string;
    readonly args: any[];
    readonly startTime: number;
    readonly env: ApplicationAuthorisationAPI;
    executing: boolean;
    sendmessage(targetID: number, intent: string, data: any, replyCallback?: replyCallback): void;
    onmessage(msg: IPCMessage): void;
}
declare class Process extends Framework {
    constructor(directory: string, args: any[]);
    name: string | undefined; // use to name an app without including a temporary window header
    data: any;
    // program flow
    init(): Promise<void>;
    frame(): void;
    terminate(): Promise<void>;
    shout(name: string): void;
    // events
    keydown(code: string, metaKey: boolean, altKey: boolean, ctrlKey: boolean, shiftKey: boolean, repeat: boolean): void | undefined | null;
    keyup(code: string, metaKey: boolean, altKey: boolean, ctrlKey: boolean, shiftKey: boolean, repeat: boolean): void | undefined | null;
    registerKeyboardShortcut: (name: string, key: string, modifiers: string[]) => void;
    exit(value?: any): void;
}
declare class Module extends Framework {
}
declare class Application extends Process {
    constructor(directory: string, args: any[]);
    renderer: Renderer;
    exit(value?: any): void;
}
declare class BackgroundProcess extends Process {
}
declare class Popup extends Application {
    #private;
    constructor(directory: string, args: any[]);
    exit(value?: any): void;
}

declare global {
    interface Window {
        renderID: number;
        Application: new (directory: string, args: any[]) => Application;
        BackgroundProcess: new (directory: string, args: any[]) => BackgroundProcess;
        Popup: new (directory: string, args: any[]) => Popup;
        Module: new (directory: string, args: any[]) => Module;
        processes: Process[];
        env: ApplicationAuthorisationAPI;
        windows: GraphicalWindow[];
    }
}
/**
 *
 * @param directory - Directory of the root of the application to execute from
 * @param args - Arguements to be passed to the process
 * @returns an Object containing a promise with the Process Waiting object - this promise will resolve when the process exits, and return the value the process exited with.
 */
declare function execute(directory: string, args?: any[]): Promise<{
    promise: Promise<unknown>;
}>;

type Permission = "windows" | "systemControl" | "containers" | "systemFiles" | "userFiles" | "customPermissions" | "network" | "audioPlayback" | "microphone" | "camera" | "managePermissions" | "operator";

/**
 * The type which is exposed to CLI utilities as a proxy to the executing app, providing a standardised interface.
 */
interface TerminalAlias {
    path: string;
    env: ApplicationAuthorisationAPI;
    logs: any[];
    clearLogs: () => void;
    origin: string;
}

type shellResult = {
    result: any;
    ref: TerminalAlias;
};
declare class Shell {
    #private;
    constructor(directory: string, env: ApplicationAuthorisationAPI);
    index: (directories?: string[]) => Promise<void>;
    setRef(ref?: TerminalAlias): void;
    exec(name: string, ...args: any[]): Promise<shellResult | undefined>;
}

// Types
type fsResponse = {
    data: any;
    ok: Boolean;
};
type directoryPointType = "blockDevice" | "characterDevice" | "directory" | "FIFO" | "file" | "socket" | "symbolicLink" | "none";
type WindowAlias = {
    move: Function;
    resize: Function;
    close: Function;
    minimise: Function;
    unminimise: Function;
    minimised: boolean;
    fullscreen: Function;
    unfullscreen: Function;
    fullscreened: boolean;
    show: Function;
    hide: Function;
    showHeader: Function;
    hideHeader: Function;
    name: string;
    shortName?: string;
    iconName: string;
    winID: number;
    applicationDirectory: string;
    position: {
        left: number;
        top: number;
        zIndex: number;
    };
    dimensions: {
        width: number;
        height: number;
    };
};
declare class ApplicationAuthorisationAPI {
    #private;
    constructor(directory: string, user: string, process?: Framework);
    readonly directory: string;
    readonly user: string;
    // shell
    shell: Shell;
    // logging
    debug(initiator: string, ...content: any): undefined;
    log(initiator: string, ...content: any): undefined;
    warn(initiator: string, ...content: any): undefined;
    error(initiator: string, ...content: any): undefined;
    /**
     * Shows a graphical prompt onscreen
     * @param text - the main statement
     * @param reason - the description of this statement
     */
    prompt(text: string, reason?: string): void;
    fs: {
        createDirectory: (directory: string) => Promise<fsResponse>;
        listDirectory: (directory?: string) => Promise<fsResponse>;
        deleteDirectory: (directory: string) => Promise<fsResponse>;
        writeFile: (directory: string, contents: string) => Promise<fsResponse>;
        deleteFile: (directory: string) => Promise<fsResponse>;
        readFile: (directory: string) => Promise<fsResponse>;
        move: (oldDirectory: string, newDirectory: string) => Promise<fsResponse>;
        stat: (directory: string) => Promise<fsResponse>;
        typeOfFile: (directory: string) => Promise<directoryPointType>;
        resolve: (base: string, child: string) => string;
        relative: (from: string, to: string) => string;
    };
    expectFileType: (directory: string, expectedType: directoryPointType) => Promise<void>;
    include(location: string): Promise<any>;
    exec: typeof execute;
    getPIDOfName(name: string): number | undefined;
    setDirectoryPermission(directory: string, permission: Permission, value: boolean): Promise<void>;
    /**
     * Provides the user a prompt to request a permission
     * @param permission - the permission to request
     * @returns Nothing - throws an error if the request is denied.
     */
    requestUserPermission(permission: Permission): Promise<true | undefined>;
    windows: {
        /**
         * @returns an array for every window's WindowAlias
         */
        all: () => WindowAlias[];
        /**
         * @returns WindowAlias of the focused window
         */
        getFocus: () => WindowAlias | undefined;
    };
}

// globals.d.ts
 // mark as module to allow global augment

declare global {
	interface Window {
		env: ApplicationAuthorisationAPI;
		Application: new (
			directory: string,
			args: any[]
		) => Application;
		BackgroundProcess: new (
			directory: string,
			args: any[]
		) => BackgroundProcess;
		Popup: new (directory: string, args: any[]) => Popup;
		Module: new (directory: string, args: any[]) => Module;
	}

	interface String {
		textAfter(after: string): string;
		textAfterAll(after: string): string;
		textBefore(before: string): string;
		textBeforeLast(before: string): string;
		map(mappings: any): string;
	}

	const env: ApplicationAuthorisationAPI;
	const Application: new (
		directory: string,
		args: any[]
	) => Application;
	const BackgroundProcess: new (
		directory: string,
		args: any[]
	) => BackgroundProcess;
	const Popup: new (directory: string, args: any[]) => Popup;
	const Module: new (directory: string, args: any[]) => Module;

	type ApplicationManifest = ProgramManifest;
}