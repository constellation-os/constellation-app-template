export {}

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

declare function getTextWidth(text: string, size?: number, fontFamily?: string): number;

type uiKitCreators = Record<string, (...args: any[]) => HTMLElement>;
interface onClickOptions {
    scale?: number;
    origin?: string;
}
interface textboxCallbackObject {
}
type uikitTextboxConfig = {
    isInvisible?: boolean;
    isEmpty?: boolean;
    fontSize?: number;
    disableMobileAutocorrect: boolean;
};
type uikitTextareaConfig = {
    isInvisible?: boolean;
    isEmpty?: boolean;
    disableMobileAutocorrect: boolean;
};
type uikitBoxConfig = {
    borderRadius?: number | string;
    colour?: string; // colour but typescript is stupid and doesn't know rgb(255, 255, 255) is a colour 🤦
};
// class
declare class Renderer {
    #private;
    defaultConfig: {
        uikitTextbox: {
            isInvisible: boolean;
            isEmpty: boolean;
            fontSize: undefined;
            disableMobileAutocorrect: boolean;
        };
        uikitTextarea: {
            isInvisible: boolean;
            isEmpty: boolean;
            disableMobileAutocorrect: boolean;
        };
        uikitBox: {
            borderRadius: number;
            colour: string;
        };
    };
    constructor(process: Process);
    window: GraphicalWindow;
    clear: () => void;
    elemID: number;
    readonly icon: (x?: number, y?: number, name?: string, scale?: number) => number;
    readonly text: (x: number, y: number, string: string, size?: number) => number;
    readonly button: (x: number, y: number, string: string, leftClickCallback?: Function, rightClickCallback?: Function, size?: number) => number;
    readonly textbox: (x: number, y: number, width: number, height: number, backtext: string, callbacks: textboxCallbackObject, options?: uikitTextboxConfig) => number;
    readonly verticalLine: (x: number, y: number, height: number) => number;
    readonly horizontalLine: (x: number, y: number, width: number) => number;
    readonly progressBar: (x: number, y: number, width: number, height: number, progress: number | "throb") => number;
    readonly textarea: (x: number, y: number, width: number, height: number, callbacks: textboxCallbackObject, options?: uikitTextareaConfig) => number;
    readonly box: (x: number, y: number, width: number, height: number, config: uikitBoxConfig) => number;
    onClick(elemID: number, leftClickCallback?: Function, rightClickCallback?: Function, otherConfig?: onClickOptions): void;
    awaitClick(callback: () => void | Promise<void>): Promise<void>;
    readonly getTextWidth: typeof getTextWidth;
    readonly setWindowIcon: (name: string) => void;
    readonly setTextboxContent: (content: string) => void;
    readonly getTextboxContent: () => string | null;
    readonly creators: uiKitCreators;
    readonly setContextMenu: (x: number, y: number, header: string, buttons: Record<string, Function>) => void;
    readonly removeContextMenu: () => void;
    windowWidth: number;
    windowHeight: number;
    redraw: () => void;
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
        sysimport: any;
        processes: Process[];
        env: ApplicationAuthorisationAPI;
        windows: GraphicalWindow[];
    }
}
declare function execute(directory: string, args?: any[]): Promise<{
    promise: Promise<unknown>;
}>;
declare global {
    interface Window {
        profileNextFrame: Boolean;
    }
}
declare global {
    interface Console {
        profile: Function;
        profileEnd: Function;
    }
}

type Permission = "windows" | "systemControl" | "containers" | "systemFiles" | "userFiles" | "customPermissions" | "network" | "audioPlayback" | "microphone" | "camera" | "managePermissions" | "operator";

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
type windowAlias = {
    move: Function;
    resize: Function;
    close: Function;
    minimise: Function;
    unminimise: Function;
    minimised: boolean;
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
    requestUserPermission(permission: Permission): Promise<true | undefined>;
    windows: {
        all: () => windowAlias[];
        getFocus: () => windowAlias | undefined;
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
}