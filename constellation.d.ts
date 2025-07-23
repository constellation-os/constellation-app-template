// @ts-nocheck

declare module "constellation.config" {
    export const name = "Constellation";
    export const version = "25.7.1a";
    export const keyword = "Sahara";
    export const wallpaper: string;
    export const wallpaperPosition = "center";
    export const importOverrides: {
        "/System/apps.js": string;
        "/System/windows.js": string;
        "/System/uiKit.js": string;
        "/System/executables.js": string;
        "/System/keybindings.js": string;
        "/System/CoreLibraries/fs.js": string;
        "/System/CoreLibraries/srcFS.js": string;
        "/System/constellation.config.js": string;
    };
    export const userfile = "/System/users.json";
    export const userDirectories: string[];
    export let status: string;
    export function setStatus(text: string | Error, state?: "working" | "error"): void;
}
declare module "errors" {
    export class AppInitialisationError extends Error {
        constructor(message: string);
    }
    export class ImportError extends Error {
        constructor(message: string);
    }
    export class InstallationError extends Error {
        constructor(message: string);
    }
    export class UIError extends Error {
        constructor(message: string);
    }
    export class MessageError extends Error {
        constructor(message: string);
    }
    export class PermissionsError extends Error {
        constructor(message: string);
    }
}
declare module "io/fs" {
    const main: any;
    export default main;
    export function fsLoaded(): Promise<void>;
}
declare module "lib/blobify" {
    export const index: any;
    export function blobify(text: string, mime?: string): string;
    export function blobifyDirectory(location: string, mime?: string): Promise<string>;
    export function translateAllBlobURIsToDirectories(text: string): string;
    export function readAndBlobify(directory: string, mime?: string): Promise<string>;
}
declare module "apps/messages" {
    export type replyCallback = (data: any) => void | undefined;
    export function sendMessage(originDirectory: string, originID: number, targetID: number, intent: string, data?: any, replyCallback?: replyCallback): void;
    export class IPCMessage {
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
}
declare module "lib/icons" {
    export const icons: {};
    export function getIcon(name: string): HTMLElement;
}
declare module "windows/cssVariables" {
    export function initialiseStyles(): void;
    export function setCSSVariable(key: string, value: string): void;
}
declare module "windows/windows" {
    import { Application } from "apps/executables";
    import * as css from "windows/cssVariables";
    export const EDGE_THRESHOLD = 8;
    export const minHeight = 25;
    export const minWidth = 100;
    export const windows: GraphicalWindow[];
    global {
        interface Window {
            windows: GraphicalWindow[];
        }
    }
    export let minimiseAnimation: string;
    export let focus: number;
    export let target: GraphicalWindow | undefined;
    export let windowTilingNumber: number;
    export const setCSSVariable: typeof css.setCSSVariable;
    export class GraphicalWindow {
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
    export function getWindowOfId(id: number): GraphicalWindow | undefined;
    export function focusWindow(id: number): undefined;
    export function setMinimiseEffect(effect: string): void;
    export function newWindow(title: string, ApplicationObject: Application): {
        id: number;
        data: GraphicalWindow;
    };
    export function reapplyStyles(): void;
}
declare module "io/keyboardShortcuts" {
    import { Process } from "apps/executables";
    export const keyboardShortcuts: any;
    global {
        interface Window {
            keyboardShortcuts: any;
        }
    }
    type modifier = "ShiftLeft" | "ShiftRight" | "MetaLeft" | "MetaRight" | "ControlLeft" | "ControlRight" | "AltLeft" | "AltRight";
    export function registerKeyboardShortcut(process: Process, name: string, key: string, modifiers: modifier[] | string[]): void;
    export function updateKeyboardShortcut(id: string, key: string, modifiers: string[]): void;
}
declare module "lib/uiKit/definitions" {
    export class uiKitInitialisationError extends Error {
        constructor(message: string);
    }
}
declare module "lib/uiKit/calcWidth" {
    export function getTextWidth(text: string, size?: number, fontFamily?: string): number;
}
declare module "lib/uiKit/contexts" {
    export function newContext(x?: number, y?: number, headerText?: string, items?: string[]): HTMLElement;
    export class ContextMenu {
        #private;
        constructor(x: number, y: number, headerText: string, items: Record<string, Function>);
        container: HTMLDivElement;
        divider: HTMLDivElement;
        header: HTMLParagraphElement;
        items: HTMLButtonElement[];
        readonly remove: () => void;
    }
}
declare module "lib/uiKit/uiKit" {
    import { GraphicalWindow } from "windows/windows";
    import { getTextWidth } from "lib/uiKit/calcWidth";
    import { Process } from "apps/executables";
    export const font = "monospace";
    export function init(): Promise<void>;
    type uiKitCreators = Record<string, (...args: any[]) => HTMLElement>;
    export interface onClickOptions {
        scale?: number;
        origin?: string;
    }
    interface textboxCallbackObject {
    }
    export type uikitTextboxConfig = {
        isInvisible?: boolean;
        isEmpty?: boolean;
        fontSize?: number;
        disableMobileAutocorrect: boolean;
    };
    export type uikitTextareaConfig = {
        isInvisible?: boolean;
        isEmpty?: boolean;
        disableMobileAutocorrect: boolean;
    };
    export type uikitBoxConfig = {
        borderRadius?: number | string;
        colour?: string;
    };
    export class Renderer {
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
        readonly textbox: (x: number, y: number, width: number | undefined, height: number | undefined, backtext: string, callbacks: textboxCallbackObject, options?: uikitTextboxConfig) => number;
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
}
declare module "lib/panic" {
    export function init(): void;
    export default function panic(error: any, source?: string): Promise<void>;
}
declare module "lib/crypto" {
    export function sha512(text: string): Promise<string>;
}
declare module "security/users" {
    export const usersDirectory = "/System/users.json";
    export type User = Record<UserStat, string | boolean>;
    type Users = Record<string, User>;
    type UserStat = "name" | "directory" | "password";
    export const users: Users;
    export const defaultUser = "guest";
    export function init(): Promise<void>;
    export function listUsers(): string[];
    export function getUser(username: string): User;
    export function setUserKey(username: string, key: UserStat, value: string | boolean): void;
    export function newUser(username: string, password: string): Promise<void>;
}
declare module "apps/executables" {
    import { Renderer } from "lib/uiKit/uiKit";
    import { ApplicationAuthorisationAPI } from "security/env";
    import { IPCMessage, replyCallback } from "apps/messages";
    export let nextPID: number;
    export class Framework {
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
    export class Process extends Framework {
        constructor(directory: string, args: any[]);
        name: string | undefined;
        data: any;
        init(): Promise<void>;
        frame(): void;
        terminate(): Promise<void>;
        shout(name: string): void;
        keydown(code: string, metaKey: boolean, altKey: boolean, ctrlKey: boolean, shiftKey: boolean, repeat: boolean): void | undefined | null;
        keyup(code: string, metaKey: boolean, altKey: boolean, ctrlKey: boolean, shiftKey: boolean, repeat: boolean): void | undefined | null;
        registerKeyboardShortcut: (name: string, key: string, modifiers: string[]) => void;
        exit(value?: any): void;
    }
    export class Module extends Framework {
    }
    export class Application extends Process {
        constructor(directory: string, args: any[]);
        renderer: Renderer;
        exit(value?: any): void;
    }
    export class BackgroundProcess extends Process {
    }
    export class Popup extends Application {
        #private;
        constructor(directory: string, args: any[]);
        exit(value?: any): void;
    }
}
declare module "apps/appWaitingObject" {
    import { Process } from "apps/executables";
    export default function AppWaitingObject(process: Process): Promise<unknown>;
}
declare module "apps/apps" {
    import { Process } from "apps/executables";
    import * as executables from "apps/executables";
    import { GraphicalWindow } from "windows/windows";
    import { ApplicationAuthorisationAPI } from "security/env";
    global {
        interface Window {
            renderID: number;
            Application: new (directory: string, args: any[]) => executables.Application;
            BackgroundProcess: new (directory: string, args: any[]) => executables.BackgroundProcess;
            Popup: new (directory: string, args: any[]) => executables.Popup;
            Module: new (directory: string, args: any[]) => executables.Module;
            sysimport: any;
            processes: executables.Process[];
            env: ApplicationAuthorisationAPI;
            windows: GraphicalWindow[];
        }
    }
    export const processes: executables.Process[];
    export function getProcessFromID(id: number): Process | undefined;
    export function execute(directory: string, args?: any[]): Promise<{
        promise: Promise<unknown>;
    }>;
    export function showPrompt(type: "error" | "warning" | "log", title: string, description?: any, buttons?: String[]): Promise<unknown>;
    export function terminate(proc: Process, isDueToCrash?: Boolean): Promise<void>;
    export function appName(proc: executables.Framework): any;
    global {
        interface Window {
            profileNextFrame: Boolean;
        }
    }
    global {
        interface Console {
            profile: Function;
            profileEnd: Function;
        }
    }
    export function run(): void;
}
declare module "security/permissions" {
    export const permissionsDirectory = "/System/applicationPermissions.json";
    export type Permission = "windows" | "systemControl" | "containers" | "systemFiles" | "userFiles" | "customPermissions" | "network" | "audioPlayback" | "microphone" | "camera" | "managePermissions" | "operator";
    export type DirectoryPermissionStats = Record<Permission, boolean> & {
        user: string;
    };
    export const permissionsMetadata: Record<Permission, {
        description: string;
        requestable?: boolean;
    }>;
    type PermissionsStore = Record<string, DirectoryPermissionStats>;
    type DirectoryDomain = "system" | "user" | "global";
    export const permissionsData: PermissionsStore;
    export function getDirectoryPermissions(directory: string): DirectoryPermissionStats;
    export function getDirectoryPermission(directory: string, permission: Permission): boolean;
    export function setDirectoryPermission(directory: string, permission: Permission, value: boolean): Promise<void>;
    export function checkDirectoryPermission(directory: string, permission: Permission): void;
    export function getFilesDomainOfDirectory(directory: string, user: string): DirectoryDomain;
}
declare module "lib/terminalAlias" {
    import { ApplicationAuthorisationAPI } from "security/env";
    export default interface TerminalAlias {
        path: string;
        env: ApplicationAuthorisationAPI;
        logs: any[];
        clearLogs: () => void;
        origin: string;
    }
}
declare module "lib/shell" {
    import TerminalAlias from "lib/terminalAlias";
    import { ApplicationAuthorisationAPI } from "security/env";
    type shellResult = {
        result: any;
        ref: TerminalAlias;
    };
    export default class Shell {
        #private;
        index: string[];
        constructor(directory: string, env: ApplicationAuthorisationAPI);
        indexCommands: (directories?: string[]) => Promise<void>;
        setRef(ref?: TerminalAlias): void;
        exec(name: string, ...args: any[]): Promise<shellResult | undefined>;
    }
}
declare module "security/env" {
    import { execute } from "apps/apps";
    import { Permission } from "security/permissions";
    import { Framework } from "apps/executables";
    import Shell from "lib/shell";
    type directoryPointType = "blockDevice" | "characterDevice" | "directory" | "FIFO" | "file" | "socket" | "symbolicLink" | "none";
    export type windowAlias = {
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
    export const associations: any;
    export class ApplicationAuthorisationAPI {
        #private;
        constructor(directory: string, user: string, process?: Framework);
        readonly directory: string;
        readonly user: string;
        shell: Shell;
        debug(initiator: string, ...content: any): undefined;
        log(initiator: string, ...content: any): undefined;
        warn(initiator: string, ...content: any): undefined;
        error(initiator: string, ...content: any): undefined;
        prompt(text: string, reason?: string): void;
        fs: any;
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
    export const systemEnv: ApplicationAuthorisationAPI;
}
declare module "lib/logging" {
    export function debug(initiator: string, content: string | Object): undefined;
    export function log(initiator: string, content: string | Object): undefined;
    export function warn(initiator: string, content: string | Object): undefined;
    export function error(initiator: string, content: string | Object): undefined;
}
declare module "installation/rm-rf" {
    export function rm_rf(): Promise<void>;
}
declare module "installation/installation.config" {
    export const folders: string[];
    export const files: any;
}
declare module "installation/folders" {
    export function createFolders(): Promise<void>;
}
declare module "installation/files" {
    export function writeFiles(): Promise<void>;
}
declare module "installation/index" {
    export function install(): Promise<void>;
}
declare module "main" {
    global {
        interface String {
            textAfter(after: string): string;
            textAfterAll(after: string): string;
            textBefore(before: string): string;
            textBeforeLast(before: string): string;
            map(mappings: any): string;
        }
    }
}
declare module "apps/ApplicationFoundation/config" {
    const _default: {
        name: string;
        description: string;
        category: string;
        author: string;
        version: number;
    };
    export default _default;
}
declare module "apps/CoreExecutable/config" {
    const _default_1: {
        name: string;
        description: string;
        category: string;
        author: string;
        version: number;
        icon: string;
    };
    export default _default_1;
}
declare module "apps/CoreExecutable/tcpsys/app" {
    import { IPCMessage } from "apps/messages";
    export default class initialiser extends BackgroundProcess {
        windows?: typeof import("windows/windows");
        init(): Promise<void>;
        onmessage(msg: IPCMessage): void;
        search(): Promise<void>;
    }
}
declare module "apps/app-template/src/config" {
    const _default_2: {
        name: string;
        description: string;
        category: string;
        author: string;
        version: number;
        icon: string;
    };
    export default _default_2;
}
declare module "apps/app-template/src/tcpsys/app" {
    export default class TemplateApp extends Application {
    }
}
declare module "apps/dock/config" {
    const _default_3: {
        name: string;
        description: string;
        category: string;
        author: string;
        version: number;
        icon: string;
    };
    export default _default_3;
}
declare module "apps/dock/lib/wallpaper" {
    import TerminalAlias from "lib/terminalAlias";
    export default function wallpaper(parent: TerminalAlias, intent: string, ...args: any[]): Promise<string>;
}
declare module "apps/dock/tcpsys/app" {
    export default class dockAndDesktop extends Application {
        dock: any;
        menubar: any;
        showApps: boolean;
        init(): Promise<void>;
        frame(): void;
    }
}
declare module "apps/dock/resources/dock" {
    import { Renderer } from "lib/uiKit/uiKit";
    import { ApplicationAuthorisationAPI, windowAlias } from "security/env";
    import dockAndDesktop from "apps/dock/tcpsys/app";
    export default class dock {
        parent: dockAndDesktop;
        renderer: Renderer;
        env: ApplicationAuthorisationAPI;
        winAPI: any;
        dockHeight: number;
        dockPadding: number;
        wins: windowAlias[];
        ok: boolean;
        constructor(parent: any);
        init(): Promise<void>;
        refresh(): void;
        render(): Promise<void>;
    }
}
declare module "apps/dock/resources/menubar" {
    import { Renderer } from "lib/uiKit/uiKit";
    import { ApplicationAuthorisationAPI } from "security/env";
    import dockAndDesktop from "apps/dock/tcpsys/app";
    export default class menubar {
        parent: dockAndDesktop;
        renderer: Renderer;
        env: ApplicationAuthorisationAPI;
        barHeight: number;
        constructor(parent: any);
        render(): void;
    }
}
declare module "apps/finder/config" {
    const _default_4: {
        name: string;
        description: string;
        category: string;
        author: string;
        version: number;
        icon: string;
    };
    export default _default_4;
}
declare module "apps/finder/lib/tcpkg" {
    import TerminalAlias from "lib/terminalAlias";
    export default function tcpkg(parent: TerminalAlias, packageDirectory: string, outputDirectory: string, ...data: any[]): Promise<string>;
}
declare module "apps/finder/lib/tcupkg" {
    import TerminalAlias from "lib/terminalAlias";
    export default function tcupkg(parent: TerminalAlias, target: string, output: string): Promise<void>;
}
declare module "apps/finder/tcpsys/app" {
    import { IPCMessage } from "apps/messages";
    type listing = {
        name: string;
        path: string;
        icon: string;
        type: string;
    };
    export default class finder extends Application {
        pathinf: any;
        textWidth(text: string): number;
        writeText(text: string): void;
        drawIcon(name: string): void;
        drawButton(text: string, callback: Function, rightCallback: Function): void;
        name: string;
        x: number;
        y: number;
        padding: number;
        type: any;
        pipes: {
            recieve: any;
            send: any;
        };
        path: string;
        selector: number;
        listing: listing[];
        location: string;
        icon: string;
        ok: boolean;
        init(): Promise<void>;
        onmessage(msg: IPCMessage): void;
        cd(directory: string): Promise<void>;
        frame(): Promise<void>;
        pickerSubmit(): void;
    }
}
declare module "apps/keystone/config" {
    const _default_5: {
        name: string;
        description: string;
        category: string;
        author: string;
        version: number;
        icon: string;
    };
    export default _default_5;
}
declare module "apps/keystone/tcpsys/app" {
    import { IPCMessage } from "apps/messages";
    type fileInfo = {
        directory: string;
        name: string;
        icon: string;
    };
    export default class KeystoneSearch extends Popup {
        pathinf: any;
        fzfLib: any;
        results: object[];
        files: string[];
        fileInfo: fileInfo[];
        searchInterval: number;
        ok: boolean;
        entries: any;
        rendering: any[];
        selector: number;
        init(): Promise<void>;
        index(directories?: string[]): Promise<{
            files: fileInfo[];
            names: string[];
        }>;
        search(term: string): Promise<void>;
        selectItem(index?: number): void;
        onmessage(msg: IPCMessage): Promise<void>;
        frame(): void;
        terminate(): Promise<void>;
    }
}
declare module "apps/popup/config" {
    const _default_6: {
        name: string;
        description: string;
        category: string;
        author: string;
        version: number;
        icon: string;
    };
    export default _default_6;
}
declare module "apps/popup/tcpsys/app" {
    export default class Dialogue extends Popup {
        params: {
            type: string;
            title: string;
            description: string;
            error: string;
            options: string[];
        };
        icon: string;
        pipe: any[];
        init(): Promise<void>;
        frame(): void;
    }
}
declare module "apps/rotur/appl/config" {
    const _default_7: {
        name: string;
        description: string;
        category: string;
        author: string;
        version: number;
        icon: string;
    };
    export default _default_7;
}
declare module "apps/rotur/appl/resources/pages/auth" {
    import { Renderer } from "lib/uiKit/uiKit";
    export default class auth {
        parent: any;
        renderer: Renderer;
        state: "username" | "password" | "loading";
        credentials: {
            username?: string;
            password?: string;
            constate?: "searching" | "connecting" | "authenticating" | "done";
        };
        constructor(parent: any);
        render(): void;
    }
}
declare module "apps/rotur/appl/tcpsys/app" {
    export default class roturGui extends Application {
        tick: number;
        state: "auth" | "dash";
        pages: any;
        name: string;
        pipes: {
            send?: any[];
            recieve?: any[];
        };
        ok: boolean;
        init(): Promise<void>;
        getStatus(): Promise<any>;
        frame(): void;
    }
}
declare module "apps/rotur/appl/resources/pages/dash" {
    import { Renderer } from "lib/uiKit/uiKit";
    import roturGui from "apps/rotur/appl/tcpsys/app";
    export default class dash {
        parent: roturGui;
        renderer: Renderer;
        status: any;
        tick: number;
        backgroundPID: number | undefined;
        constructor(parent: roturGui);
        getBackgroundProcessID(): number | undefined;
        refreshStatus(): Promise<void>;
        refresh(): Promise<void>;
        render(): void;
    }
}
declare module "apps/rotur/backgr/config" {
    const _default_8: {
        author: string;
        version: number;
        icon: string;
        userspace: boolean;
    };
    export default _default_8;
}
declare module "apps/rotur/backgr/postunpkg" {
    export default function postUnpackage(directory: string): Promise<void>;
}
declare module "apps/rotur/backgr/data/rotur.config" {
    const _default_9: {};
    export default _default_9;
}
declare module "apps/rotur/backgr/resources/lib" {
    import { Process } from "apps/executables";
    export function insureConnection(): Promise<void>;
    export function getToken(sendmessage: Process["sendmessage"]): Promise<unknown>;
}
declare module "apps/rotur/backgr/tcpsys/app" {
    import { IPCMessage } from "apps/messages";
    type roturConfiguration = {
        username: string;
        password: string;
    };
    export default class roturIntegration extends BackgroundProcess {
        name: string;
        rotur: any;
        libDirectory: string;
        config?: roturConfiguration;
        liveStatusText: string;
        ok: boolean;
        fsInit(): Promise<void>;
        validConnection(): Promise<void>;
        init(): Promise<void>;
        auth(username: string, password: string): Promise<any>;
        connected(): void;
        get status(): "Connected and Authenticated" | "Connected and Unauthenticated..." | "Not Connected";
        generateStatus(): string;
        frame(): void;
        onmessage(msg: IPCMessage): Promise<void>;
    }
}
declare module "apps/settings/config" {
    const _default_10: {
        name: string;
        description: string;
        category: string;
        author: string;
        version: number;
        icon: string;
    };
    export default _default_10;
}
declare module "apps/settings/resources/pages/home" {
    const _default_11: {
        title: string;
        items: ({
            type: string;
            text: string;
            href?: undefined;
        } | {
            type: string;
            text: string;
            href: string;
        })[];
    };
    export default _default_11;
}
declare module "apps/settings/resources/pages/index" {
    export const list: string[];
    export default function (parent: any): Promise<any>;
}
declare module "apps/settings/resources/pages/windows" {
    export function init(process: any): Promise<void>;
    const _default_12: {
        title: string;
        items: {
            type: string;
            text: string;
            default: number;
            options: string[];
            getValue: () => any;
            setValue: (value: string) => void;
        }[];
    };
    export default _default_12;
}
declare module "apps/settings/resources/panels/body" {
    export default class body {
        constructor(parent: any);
        parent: any;
        pages: any;
        location: string;
        initialised: boolean;
        init(): Promise<void>;
        renderStructure(struct: any): Promise<void>;
        render(): Promise<void>;
    }
}
declare module "apps/settings/resources/panels/sidebar" {
    export default class sidebar {
        parent: any;
        constructor(parent: any);
        render(): void;
    }
}
declare module "apps/settings/tcpsys/app" {
    import body from "apps/settings/resources/panels/body";
    import sidebar from "apps/settings/resources/panels/sidebar";
    export default class systemSettings extends Application {
        sidebar?: sidebar;
        body?: body;
        init(): Promise<void>;
        frame(): void;
    }
}
declare module "apps/terminal/config" {
    const _default_13: {
        name: string;
        description: string;
        category: string;
        author: string;
        version: number;
        icon: string;
    };
    export default _default_13;
}
declare module "apps/terminal/lib/cat" {
    import TerminalAlias from "lib/terminalAlias";
    export default function cat(parent: TerminalAlias, directory: string): Promise<any>;
}
declare module "apps/terminal/lib/cd" {
    import TerminalAlias from "lib/terminalAlias";
    export default function cd(parent: TerminalAlias, directory?: string): Promise<string | undefined>;
}
declare module "apps/terminal/lib/clear" {
    import TerminalAlias from "lib/terminalAlias";
    export default function clear(parent: TerminalAlias): void;
}
declare module "apps/terminal/lib/ls" {
    import TerminalAlias from "lib/terminalAlias";
    export default function ls(parent: TerminalAlias, directory?: string): Promise<any>;
}
declare module "apps/terminal/lib/mkdir" {
    import TerminalAlias from "lib/terminalAlias";
    export default function mkdir(parent: TerminalAlias, directory: string): Promise<undefined>;
}
declare module "apps/terminal/lib/origin" {
    import TerminalAlias from "lib/terminalAlias";
    export default function origin(parent: TerminalAlias): string;
}
declare module "apps/terminal/lib/pwd" {
    import TerminalAlias from "lib/terminalAlias";
    export default function pwd(parent: TerminalAlias): string;
}
declare module "apps/terminal/lib/size" {
    import TerminalAlias from "lib/terminalAlias";
    export default function size(parent: TerminalAlias, directory: string): Promise<string>;
}
declare module "apps/terminal/lib/touch" {
    import TerminalAlias from "lib/terminalAlias";
    export default function touch(parent: TerminalAlias, directory: string): Promise<string | undefined>;
}
declare module "apps/terminal/lib/tree" {
    import TerminalAlias from "lib/terminalAlias";
    export default function tree(parent: TerminalAlias, directory?: string): Promise<string>;
}
declare module "apps/terminal/tcpsys/app" {
    import { IPCMessage } from "apps/messages";
    export default class terminalUI extends Application {
        cmdreg: any;
        logs: string[];
        terminalPath: string;
        scroll: number;
        displayedLogs: number;
        tick: number;
        tick2: number;
        hasExecutedCommand: boolean;
        willCrash: boolean;
        pretext: string;
        init(): Promise<void>;
        onmessage(msg: IPCMessage): void;
        keydown(code: string, metaKey: boolean, altKey: boolean, ctrlKey: boolean, shiftKey: boolean, repeat: boolean): void;
        execute(text: string): Promise<void>;
        render(): void;
        frame(): void;
    }
}
declare module "lib/isDev" {
    export const isDev: boolean;
}
declare module "lib/uiKit/devmode" { }
declare module "syslib/blob" {
    export function blobify(text: string, mime?: string): string;
}
declare module "syslib/keyboardUtils" {
    export function translateKeyName(key: KeyboardEvent["code"]): string;
}
declare module "syslib/mime" {
    export function getType(extension: string): string | null;
}
declare module "syslib/pathinf" {
    export function pathIcon(directory: string): Promise<any>;
    export function pathName(directory: string): Promise<any>;
    export function pathMime(directory: string): Promise<"text/plain" | "text/javascript" | "application/octet-stream" | "image/png" | "image/jpeg" | "application/json" | undefined>;
    export function pathSize(directory: string): Promise<{
        bytes: number;
        value: number;
        units: string;
    }>;
}
declare module "syslib/userFileSelector" {
    export function selectFile(initialDirectory?: string): Promise<unknown>;
}
declare module "syslib/mime/mimes" {
    const _default_14: {
        "application/andrew-inset": string[];
        "application/appinstaller": string[];
        "application/applixware": string[];
        "application/appx": string[];
        "application/appxbundle": string[];
        "application/atom+xml": string[];
        "application/atomcat+xml": string[];
        "application/atomdeleted+xml": string[];
        "application/atomsvc+xml": string[];
        "application/atsc-dwd+xml": string[];
        "application/atsc-held+xml": string[];
        "application/atsc-rsat+xml": string[];
        "application/automationml-aml+xml": string[];
        "application/automationml-amlx+zip": string[];
        "application/bdoc": string[];
        "application/calendar+xml": string[];
        "application/ccxml+xml": string[];
        "application/cdfx+xml": string[];
        "application/cdmi-capability": string[];
        "application/cdmi-container": string[];
        "application/cdmi-domain": string[];
        "application/cdmi-object": string[];
        "application/cdmi-queue": string[];
        "application/cpl+xml": string[];
        "application/cu-seeme": string[];
        "application/cwl": string[];
        "application/dash+xml": string[];
        "application/dash-patch+xml": string[];
        "application/davmount+xml": string[];
        "application/dicom": string[];
        "application/docbook+xml": string[];
        "application/dssc+der": string[];
        "application/dssc+xml": string[];
        "application/ecmascript": string[];
        "application/emma+xml": string[];
        "application/emotionml+xml": string[];
        "application/epub+zip": string[];
        "application/exi": string[];
        "application/express": string[];
        "application/fdf": string[];
        "application/fdt+xml": string[];
        "application/font-tdpfr": string[];
        "application/geo+json": string[];
        "application/gml+xml": string[];
        "application/gpx+xml": string[];
        "application/gxf": string[];
        "application/gzip": string[];
        "application/hjson": string[];
        "application/hyperstudio": string[];
        "application/inkml+xml": string[];
        "application/ipfix": string[];
        "application/its+xml": string[];
        "application/java-archive": string[];
        "application/java-serialized-object": string[];
        "application/java-vm": string[];
        "application/javascript": string[];
        "application/json": string[];
        "application/json5": string[];
        "application/jsonml+json": string[];
        "application/ld+json": string[];
        "application/lgr+xml": string[];
        "application/lost+xml": string[];
        "application/mac-binhex40": string[];
        "application/mac-compactpro": string[];
        "application/mads+xml": string[];
        "application/manifest+json": string[];
        "application/marc": string[];
        "application/marcxml+xml": string[];
        "application/mathematica": string[];
        "application/mathml+xml": string[];
        "application/mbox": string[];
        "application/media-policy-dataset+xml": string[];
        "application/mediaservercontrol+xml": string[];
        "application/metalink+xml": string[];
        "application/metalink4+xml": string[];
        "application/mets+xml": string[];
        "application/mmt-aei+xml": string[];
        "application/mmt-usd+xml": string[];
        "application/mods+xml": string[];
        "application/mp21": string[];
        "application/mp4": string[];
        "application/msix": string[];
        "application/msixbundle": string[];
        "application/msword": string[];
        "application/mxf": string[];
        "application/n-quads": string[];
        "application/n-triples": string[];
        "application/node": string[];
        "application/octet-stream": string[];
        "application/oda": string[];
        "application/oebps-package+xml": string[];
        "application/ogg": string[];
        "application/omdoc+xml": string[];
        "application/onenote": string[];
        "application/oxps": string[];
        "application/p2p-overlay+xml": string[];
        "application/patch-ops-error+xml": string[];
        "application/pdf": string[];
        "application/pgp-encrypted": string[];
        "application/pgp-keys": string[];
        "application/pgp-signature": string[];
        "application/pics-rules": string[];
        "application/pkcs10": string[];
        "application/pkcs7-mime": string[];
        "application/pkcs7-signature": string[];
        "application/pkcs8": string[];
        "application/pkix-attr-cert": string[];
        "application/pkix-cert": string[];
        "application/pkix-crl": string[];
        "application/pkix-pkipath": string[];
        "application/pkixcmp": string[];
        "application/pls+xml": string[];
        "application/postscript": string[];
        "application/provenance+xml": string[];
        "application/pskc+xml": string[];
        "application/raml+yaml": string[];
        "application/rdf+xml": string[];
        "application/reginfo+xml": string[];
        "application/relax-ng-compact-syntax": string[];
        "application/resource-lists+xml": string[];
        "application/resource-lists-diff+xml": string[];
        "application/rls-services+xml": string[];
        "application/route-apd+xml": string[];
        "application/route-s-tsid+xml": string[];
        "application/route-usd+xml": string[];
        "application/rpki-ghostbusters": string[];
        "application/rpki-manifest": string[];
        "application/rpki-roa": string[];
        "application/rsd+xml": string[];
        "application/rss+xml": string[];
        "application/rtf": string[];
        "application/sbml+xml": string[];
        "application/scvp-cv-request": string[];
        "application/scvp-cv-response": string[];
        "application/scvp-vp-request": string[];
        "application/scvp-vp-response": string[];
        "application/sdp": string[];
        "application/senml+xml": string[];
        "application/sensml+xml": string[];
        "application/set-payment-initiation": string[];
        "application/set-registration-initiation": string[];
        "application/shf+xml": string[];
        "application/sieve": string[];
        "application/smil+xml": string[];
        "application/sparql-query": string[];
        "application/sparql-results+xml": string[];
        "application/sql": string[];
        "application/srgs": string[];
        "application/srgs+xml": string[];
        "application/sru+xml": string[];
        "application/ssdl+xml": string[];
        "application/ssml+xml": string[];
        "application/swid+xml": string[];
        "application/tei+xml": string[];
        "application/thraud+xml": string[];
        "application/timestamped-data": string[];
        "application/toml": string[];
        "application/trig": string[];
        "application/ttml+xml": string[];
        "application/ubjson": string[];
        "application/urc-ressheet+xml": string[];
        "application/urc-targetdesc+xml": string[];
        "application/voicexml+xml": string[];
        "application/wasm": string[];
        "application/watcherinfo+xml": string[];
        "application/widget": string[];
        "application/winhlp": string[];
        "application/wsdl+xml": string[];
        "application/wspolicy+xml": string[];
        "application/xaml+xml": string[];
        "application/xcap-att+xml": string[];
        "application/xcap-caps+xml": string[];
        "application/xcap-diff+xml": string[];
        "application/xcap-el+xml": string[];
        "application/xcap-ns+xml": string[];
        "application/xenc+xml": string[];
        "application/xfdf": string[];
        "application/xhtml+xml": string[];
        "application/xliff+xml": string[];
        "application/xml": string[];
        "application/xml-dtd": string[];
        "application/xop+xml": string[];
        "application/xproc+xml": string[];
        "application/xslt+xml": string[];
        "application/xspf+xml": string[];
        "application/xv+xml": string[];
        "application/yang": string[];
        "application/yin+xml": string[];
        "application/zip": string[];
        "application/zip+dotlottie": string[];
        "audio/3gpp": string[];
        "audio/aac": string[];
        "audio/adpcm": string[];
        "audio/amr": string[];
        "audio/basic": string[];
        "audio/midi": string[];
        "audio/mobile-xmf": string[];
        "audio/mp3": string[];
        "audio/mp4": string[];
        "audio/mpeg": string[];
        "audio/ogg": string[];
        "audio/s3m": string[];
        "audio/silk": string[];
        "audio/wav": string[];
        "audio/wave": string[];
        "audio/webm": string[];
        "audio/xm": string[];
        "font/collection": string[];
        "font/otf": string[];
        "font/ttf": string[];
        "font/woff": string[];
        "font/woff2": string[];
        "image/aces": string[];
        "image/apng": string[];
        "image/avci": string[];
        "image/avcs": string[];
        "image/avif": string[];
        "image/bmp": string[];
        "image/cgm": string[];
        "image/dicom-rle": string[];
        "image/dpx": string[];
        "image/emf": string[];
        "image/fits": string[];
        "image/g3fax": string[];
        "image/gif": string[];
        "image/heic": string[];
        "image/heic-sequence": string[];
        "image/heif": string[];
        "image/heif-sequence": string[];
        "image/hej2k": string[];
        "image/ief": string[];
        "image/jaii": string[];
        "image/jais": string[];
        "image/jls": string[];
        "image/jp2": string[];
        "image/jpeg": string[];
        "image/jph": string[];
        "image/jphc": string[];
        "image/jpm": string[];
        "image/jpx": string[];
        "image/jxl": string[];
        "image/jxr": string[];
        "image/jxra": string[];
        "image/jxrs": string[];
        "image/jxs": string[];
        "image/jxsc": string[];
        "image/jxsi": string[];
        "image/jxss": string[];
        "image/ktx": string[];
        "image/ktx2": string[];
        "image/pjpeg": string[];
        "image/png": string[];
        "image/sgi": string[];
        "image/svg+xml": string[];
        "image/t38": string[];
        "image/tiff": string[];
        "image/tiff-fx": string[];
        "image/webp": string[];
        "image/wmf": string[];
        "message/disposition-notification": string[];
        "message/global": string[];
        "message/global-delivery-status": string[];
        "message/global-disposition-notification": string[];
        "message/global-headers": string[];
        "message/rfc822": string[];
        "model/3mf": string[];
        "model/gltf+json": string[];
        "model/gltf-binary": string[];
        "model/iges": string[];
        "model/jt": string[];
        "model/mesh": string[];
        "model/mtl": string[];
        "model/obj": string[];
        "model/prc": string[];
        "model/step": string[];
        "model/step+xml": string[];
        "model/step+zip": string[];
        "model/step-xml+zip": string[];
        "model/stl": string[];
        "model/u3d": string[];
        "model/vrml": string[];
        "model/x3d+binary": string[];
        "model/x3d+fastinfoset": string[];
        "model/x3d+vrml": string[];
        "model/x3d+xml": string[];
        "model/x3d-vrml": string[];
        "text/cache-manifest": string[];
        "text/calendar": string[];
        "text/coffeescript": string[];
        "text/css": string[];
        "text/csv": string[];
        "text/html": string[];
        "text/jade": string[];
        "text/javascript": string[];
        "text/jsx": string[];
        "text/less": string[];
        "text/markdown": string[];
        "text/mathml": string[];
        "text/mdx": string[];
        "text/n3": string[];
        "text/plain": string[];
        "text/richtext": string[];
        "text/rtf": string[];
        "text/sgml": string[];
        "text/shex": string[];
        "text/slim": string[];
        "text/spdx": string[];
        "text/stylus": string[];
        "text/tab-separated-values": string[];
        "text/troff": string[];
        "text/turtle": string[];
        "text/uri-list": string[];
        "text/vcard": string[];
        "text/vtt": string[];
        "text/wgsl": string[];
        "text/xml": string[];
        "text/yaml": string[];
        "video/3gpp": string[];
        "video/3gpp2": string[];
        "video/h261": string[];
        "video/h263": string[];
        "video/h264": string[];
        "video/iso.segment": string[];
        "video/jpeg": string[];
        "video/jpm": string[];
        "video/mj2": string[];
        "video/mp2t": string[];
        "video/mp4": string[];
        "video/mpeg": string[];
        "video/ogg": string[];
        "video/quicktime": string[];
        "video/webm": string[];
        "application/prs.cww": string[];
        "application/prs.xsf+xml": string[];
        "application/vnd.1000minds.decision-model+xml": string[];
        "application/vnd.3gpp.pic-bw-large": string[];
        "application/vnd.3gpp.pic-bw-small": string[];
        "application/vnd.3gpp.pic-bw-var": string[];
        "application/vnd.3gpp2.tcap": string[];
        "application/vnd.3m.post-it-notes": string[];
        "application/vnd.accpac.simply.aso": string[];
        "application/vnd.accpac.simply.imp": string[];
        "application/vnd.acucobol": string[];
        "application/vnd.acucorp": string[];
        "application/vnd.adobe.air-application-installer-package+zip": string[];
        "application/vnd.adobe.formscentral.fcdt": string[];
        "application/vnd.adobe.fxp": string[];
        "application/vnd.adobe.xdp+xml": string[];
        "application/vnd.adobe.xfdf": string[];
        "application/vnd.age": string[];
        "application/vnd.ahead.space": string[];
        "application/vnd.airzip.filesecure.azf": string[];
        "application/vnd.airzip.filesecure.azs": string[];
        "application/vnd.amazon.ebook": string[];
        "application/vnd.americandynamics.acc": string[];
        "application/vnd.amiga.ami": string[];
        "application/vnd.android.package-archive": string[];
        "application/vnd.anser-web-certificate-issue-initiation": string[];
        "application/vnd.anser-web-funds-transfer-initiation": string[];
        "application/vnd.antix.game-component": string[];
        "application/vnd.apple.installer+xml": string[];
        "application/vnd.apple.keynote": string[];
        "application/vnd.apple.mpegurl": string[];
        "application/vnd.apple.numbers": string[];
        "application/vnd.apple.pages": string[];
        "application/vnd.apple.pkpass": string[];
        "application/vnd.aristanetworks.swi": string[];
        "application/vnd.astraea-software.iota": string[];
        "application/vnd.audiograph": string[];
        "application/vnd.autodesk.fbx": string[];
        "application/vnd.balsamiq.bmml+xml": string[];
        "application/vnd.blueice.multipass": string[];
        "application/vnd.bmi": string[];
        "application/vnd.businessobjects": string[];
        "application/vnd.chemdraw+xml": string[];
        "application/vnd.chipnuts.karaoke-mmd": string[];
        "application/vnd.cinderella": string[];
        "application/vnd.citationstyles.style+xml": string[];
        "application/vnd.claymore": string[];
        "application/vnd.cloanto.rp9": string[];
        "application/vnd.clonk.c4group": string[];
        "application/vnd.cluetrust.cartomobile-config": string[];
        "application/vnd.cluetrust.cartomobile-config-pkg": string[];
        "application/vnd.commonspace": string[];
        "application/vnd.contact.cmsg": string[];
        "application/vnd.cosmocaller": string[];
        "application/vnd.crick.clicker": string[];
        "application/vnd.crick.clicker.keyboard": string[];
        "application/vnd.crick.clicker.palette": string[];
        "application/vnd.crick.clicker.template": string[];
        "application/vnd.crick.clicker.wordbank": string[];
        "application/vnd.criticaltools.wbs+xml": string[];
        "application/vnd.ctc-posml": string[];
        "application/vnd.cups-ppd": string[];
        "application/vnd.curl.car": string[];
        "application/vnd.curl.pcurl": string[];
        "application/vnd.dart": string[];
        "application/vnd.data-vision.rdz": string[];
        "application/vnd.dbf": string[];
        "application/vnd.dcmp+xml": string[];
        "application/vnd.dece.data": string[];
        "application/vnd.dece.ttml+xml": string[];
        "application/vnd.dece.unspecified": string[];
        "application/vnd.dece.zip": string[];
        "application/vnd.denovo.fcselayout-link": string[];
        "application/vnd.dna": string[];
        "application/vnd.dolby.mlp": string[];
        "application/vnd.dpgraph": string[];
        "application/vnd.dreamfactory": string[];
        "application/vnd.ds-keypoint": string[];
        "application/vnd.dvb.ait": string[];
        "application/vnd.dvb.service": string[];
        "application/vnd.dynageo": string[];
        "application/vnd.ecowin.chart": string[];
        "application/vnd.enliven": string[];
        "application/vnd.epson.esf": string[];
        "application/vnd.epson.msf": string[];
        "application/vnd.epson.quickanime": string[];
        "application/vnd.epson.salt": string[];
        "application/vnd.epson.ssf": string[];
        "application/vnd.eszigno3+xml": string[];
        "application/vnd.ezpix-album": string[];
        "application/vnd.ezpix-package": string[];
        "application/vnd.fdf": string[];
        "application/vnd.fdsn.mseed": string[];
        "application/vnd.fdsn.seed": string[];
        "application/vnd.flographit": string[];
        "application/vnd.fluxtime.clip": string[];
        "application/vnd.framemaker": string[];
        "application/vnd.frogans.fnc": string[];
        "application/vnd.frogans.ltf": string[];
        "application/vnd.fsc.weblaunch": string[];
        "application/vnd.fujitsu.oasys": string[];
        "application/vnd.fujitsu.oasys2": string[];
        "application/vnd.fujitsu.oasys3": string[];
        "application/vnd.fujitsu.oasysgp": string[];
        "application/vnd.fujitsu.oasysprs": string[];
        "application/vnd.fujixerox.ddd": string[];
        "application/vnd.fujixerox.docuworks": string[];
        "application/vnd.fujixerox.docuworks.binder": string[];
        "application/vnd.fuzzysheet": string[];
        "application/vnd.genomatix.tuxedo": string[];
        "application/vnd.geogebra.file": string[];
        "application/vnd.geogebra.slides": string[];
        "application/vnd.geogebra.tool": string[];
        "application/vnd.geometry-explorer": string[];
        "application/vnd.geonext": string[];
        "application/vnd.geoplan": string[];
        "application/vnd.geospace": string[];
        "application/vnd.gmx": string[];
        "application/vnd.google-apps.document": string[];
        "application/vnd.google-apps.drawing": string[];
        "application/vnd.google-apps.form": string[];
        "application/vnd.google-apps.jam": string[];
        "application/vnd.google-apps.map": string[];
        "application/vnd.google-apps.presentation": string[];
        "application/vnd.google-apps.script": string[];
        "application/vnd.google-apps.site": string[];
        "application/vnd.google-apps.spreadsheet": string[];
        "application/vnd.google-earth.kml+xml": string[];
        "application/vnd.google-earth.kmz": string[];
        "application/vnd.gov.sk.xmldatacontainer+xml": string[];
        "application/vnd.grafeq": string[];
        "application/vnd.groove-account": string[];
        "application/vnd.groove-help": string[];
        "application/vnd.groove-identity-message": string[];
        "application/vnd.groove-injector": string[];
        "application/vnd.groove-tool-message": string[];
        "application/vnd.groove-tool-template": string[];
        "application/vnd.groove-vcard": string[];
        "application/vnd.hal+xml": string[];
        "application/vnd.handheld-entertainment+xml": string[];
        "application/vnd.hbci": string[];
        "application/vnd.hhe.lesson-player": string[];
        "application/vnd.hp-hpgl": string[];
        "application/vnd.hp-hpid": string[];
        "application/vnd.hp-hps": string[];
        "application/vnd.hp-jlyt": string[];
        "application/vnd.hp-pcl": string[];
        "application/vnd.hp-pclxl": string[];
        "application/vnd.hydrostatix.sof-data": string[];
        "application/vnd.ibm.minipay": string[];
        "application/vnd.ibm.modcap": string[];
        "application/vnd.ibm.rights-management": string[];
        "application/vnd.ibm.secure-container": string[];
        "application/vnd.iccprofile": string[];
        "application/vnd.igloader": string[];
        "application/vnd.immervision-ivp": string[];
        "application/vnd.immervision-ivu": string[];
        "application/vnd.insors.igm": string[];
        "application/vnd.intercon.formnet": string[];
        "application/vnd.intergeo": string[];
        "application/vnd.intu.qbo": string[];
        "application/vnd.intu.qfx": string[];
        "application/vnd.ipunplugged.rcprofile": string[];
        "application/vnd.irepository.package+xml": string[];
        "application/vnd.is-xpr": string[];
        "application/vnd.isac.fcs": string[];
        "application/vnd.jam": string[];
        "application/vnd.jcp.javame.midlet-rms": string[];
        "application/vnd.jisp": string[];
        "application/vnd.joost.joda-archive": string[];
        "application/vnd.kahootz": string[];
        "application/vnd.kde.karbon": string[];
        "application/vnd.kde.kchart": string[];
        "application/vnd.kde.kformula": string[];
        "application/vnd.kde.kivio": string[];
        "application/vnd.kde.kontour": string[];
        "application/vnd.kde.kpresenter": string[];
        "application/vnd.kde.kspread": string[];
        "application/vnd.kde.kword": string[];
        "application/vnd.kenameaapp": string[];
        "application/vnd.kidspiration": string[];
        "application/vnd.kinar": string[];
        "application/vnd.koan": string[];
        "application/vnd.kodak-descriptor": string[];
        "application/vnd.las.las+xml": string[];
        "application/vnd.llamagraphics.life-balance.desktop": string[];
        "application/vnd.llamagraphics.life-balance.exchange+xml": string[];
        "application/vnd.lotus-1-2-3": string[];
        "application/vnd.lotus-approach": string[];
        "application/vnd.lotus-freelance": string[];
        "application/vnd.lotus-notes": string[];
        "application/vnd.lotus-organizer": string[];
        "application/vnd.lotus-screencam": string[];
        "application/vnd.lotus-wordpro": string[];
        "application/vnd.macports.portpkg": string[];
        "application/vnd.mapbox-vector-tile": string[];
        "application/vnd.mcd": string[];
        "application/vnd.medcalcdata": string[];
        "application/vnd.mediastation.cdkey": string[];
        "application/vnd.mfer": string[];
        "application/vnd.mfmp": string[];
        "application/vnd.micrografx.flo": string[];
        "application/vnd.micrografx.igx": string[];
        "application/vnd.mif": string[];
        "application/vnd.mobius.daf": string[];
        "application/vnd.mobius.dis": string[];
        "application/vnd.mobius.mbk": string[];
        "application/vnd.mobius.mqy": string[];
        "application/vnd.mobius.msl": string[];
        "application/vnd.mobius.plc": string[];
        "application/vnd.mobius.txf": string[];
        "application/vnd.mophun.application": string[];
        "application/vnd.mophun.certificate": string[];
        "application/vnd.mozilla.xul+xml": string[];
        "application/vnd.ms-artgalry": string[];
        "application/vnd.ms-cab-compressed": string[];
        "application/vnd.ms-excel": string[];
        "application/vnd.ms-excel.addin.macroenabled.12": string[];
        "application/vnd.ms-excel.sheet.binary.macroenabled.12": string[];
        "application/vnd.ms-excel.sheet.macroenabled.12": string[];
        "application/vnd.ms-excel.template.macroenabled.12": string[];
        "application/vnd.ms-fontobject": string[];
        "application/vnd.ms-htmlhelp": string[];
        "application/vnd.ms-ims": string[];
        "application/vnd.ms-lrm": string[];
        "application/vnd.ms-officetheme": string[];
        "application/vnd.ms-outlook": string[];
        "application/vnd.ms-pki.seccat": string[];
        "application/vnd.ms-pki.stl": string[];
        "application/vnd.ms-powerpoint": string[];
        "application/vnd.ms-powerpoint.addin.macroenabled.12": string[];
        "application/vnd.ms-powerpoint.presentation.macroenabled.12": string[];
        "application/vnd.ms-powerpoint.slide.macroenabled.12": string[];
        "application/vnd.ms-powerpoint.slideshow.macroenabled.12": string[];
        "application/vnd.ms-powerpoint.template.macroenabled.12": string[];
        "application/vnd.ms-project": string[];
        "application/vnd.ms-visio.viewer": string[];
        "application/vnd.ms-word.document.macroenabled.12": string[];
        "application/vnd.ms-word.template.macroenabled.12": string[];
        "application/vnd.ms-works": string[];
        "application/vnd.ms-wpl": string[];
        "application/vnd.ms-xpsdocument": string[];
        "application/vnd.mseq": string[];
        "application/vnd.musician": string[];
        "application/vnd.muvee.style": string[];
        "application/vnd.mynfc": string[];
        "application/vnd.nato.bindingdataobject+xml": string[];
        "application/vnd.neurolanguage.nlu": string[];
        "application/vnd.nitf": string[];
        "application/vnd.noblenet-directory": string[];
        "application/vnd.noblenet-sealer": string[];
        "application/vnd.noblenet-web": string[];
        "application/vnd.nokia.n-gage.ac+xml": string[];
        "application/vnd.nokia.n-gage.data": string[];
        "application/vnd.nokia.n-gage.symbian.install": string[];
        "application/vnd.nokia.radio-preset": string[];
        "application/vnd.nokia.radio-presets": string[];
        "application/vnd.novadigm.edm": string[];
        "application/vnd.novadigm.edx": string[];
        "application/vnd.novadigm.ext": string[];
        "application/vnd.oasis.opendocument.chart": string[];
        "application/vnd.oasis.opendocument.chart-template": string[];
        "application/vnd.oasis.opendocument.database": string[];
        "application/vnd.oasis.opendocument.formula": string[];
        "application/vnd.oasis.opendocument.formula-template": string[];
        "application/vnd.oasis.opendocument.graphics": string[];
        "application/vnd.oasis.opendocument.graphics-template": string[];
        "application/vnd.oasis.opendocument.image": string[];
        "application/vnd.oasis.opendocument.image-template": string[];
        "application/vnd.oasis.opendocument.presentation": string[];
        "application/vnd.oasis.opendocument.presentation-template": string[];
        "application/vnd.oasis.opendocument.spreadsheet": string[];
        "application/vnd.oasis.opendocument.spreadsheet-template": string[];
        "application/vnd.oasis.opendocument.text": string[];
        "application/vnd.oasis.opendocument.text-master": string[];
        "application/vnd.oasis.opendocument.text-template": string[];
        "application/vnd.oasis.opendocument.text-web": string[];
        "application/vnd.olpc-sugar": string[];
        "application/vnd.oma.dd2+xml": string[];
        "application/vnd.openblox.game+xml": string[];
        "application/vnd.openofficeorg.extension": string[];
        "application/vnd.openstreetmap.data+xml": string[];
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": string[];
        "application/vnd.openxmlformats-officedocument.presentationml.slide": string[];
        "application/vnd.openxmlformats-officedocument.presentationml.slideshow": string[];
        "application/vnd.openxmlformats-officedocument.presentationml.template": string[];
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": string[];
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template": string[];
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": string[];
        "application/vnd.openxmlformats-officedocument.wordprocessingml.template": string[];
        "application/vnd.osgeo.mapguide.package": string[];
        "application/vnd.osgi.dp": string[];
        "application/vnd.osgi.subsystem": string[];
        "application/vnd.palm": string[];
        "application/vnd.pawaafile": string[];
        "application/vnd.pg.format": string[];
        "application/vnd.pg.osasli": string[];
        "application/vnd.picsel": string[];
        "application/vnd.pmi.widget": string[];
        "application/vnd.pocketlearn": string[];
        "application/vnd.powerbuilder6": string[];
        "application/vnd.previewsystems.box": string[];
        "application/vnd.procrate.brushset": string[];
        "application/vnd.procreate.brush": string[];
        "application/vnd.procreate.dream": string[];
        "application/vnd.proteus.magazine": string[];
        "application/vnd.publishare-delta-tree": string[];
        "application/vnd.pvi.ptid1": string[];
        "application/vnd.pwg-xhtml-print+xml": string[];
        "application/vnd.quark.quarkxpress": string[];
        "application/vnd.rar": string[];
        "application/vnd.realvnc.bed": string[];
        "application/vnd.recordare.musicxml": string[];
        "application/vnd.recordare.musicxml+xml": string[];
        "application/vnd.rig.cryptonote": string[];
        "application/vnd.rim.cod": string[];
        "application/vnd.rn-realmedia": string[];
        "application/vnd.rn-realmedia-vbr": string[];
        "application/vnd.route66.link66+xml": string[];
        "application/vnd.sailingtracker.track": string[];
        "application/vnd.seemail": string[];
        "application/vnd.sema": string[];
        "application/vnd.semd": string[];
        "application/vnd.semf": string[];
        "application/vnd.shana.informed.formdata": string[];
        "application/vnd.shana.informed.formtemplate": string[];
        "application/vnd.shana.informed.interchange": string[];
        "application/vnd.shana.informed.package": string[];
        "application/vnd.simtech-mindmapper": string[];
        "application/vnd.smaf": string[];
        "application/vnd.smart.teacher": string[];
        "application/vnd.software602.filler.form+xml": string[];
        "application/vnd.solent.sdkm+xml": string[];
        "application/vnd.spotfire.dxp": string[];
        "application/vnd.spotfire.sfs": string[];
        "application/vnd.stardivision.calc": string[];
        "application/vnd.stardivision.draw": string[];
        "application/vnd.stardivision.impress": string[];
        "application/vnd.stardivision.math": string[];
        "application/vnd.stardivision.writer": string[];
        "application/vnd.stardivision.writer-global": string[];
        "application/vnd.stepmania.package": string[];
        "application/vnd.stepmania.stepchart": string[];
        "application/vnd.sun.wadl+xml": string[];
        "application/vnd.sun.xml.calc": string[];
        "application/vnd.sun.xml.calc.template": string[];
        "application/vnd.sun.xml.draw": string[];
        "application/vnd.sun.xml.draw.template": string[];
        "application/vnd.sun.xml.impress": string[];
        "application/vnd.sun.xml.impress.template": string[];
        "application/vnd.sun.xml.math": string[];
        "application/vnd.sun.xml.writer": string[];
        "application/vnd.sun.xml.writer.global": string[];
        "application/vnd.sun.xml.writer.template": string[];
        "application/vnd.sus-calendar": string[];
        "application/vnd.svd": string[];
        "application/vnd.symbian.install": string[];
        "application/vnd.syncml+xml": string[];
        "application/vnd.syncml.dm+wbxml": string[];
        "application/vnd.syncml.dm+xml": string[];
        "application/vnd.syncml.dmddf+xml": string[];
        "application/vnd.tao.intent-module-archive": string[];
        "application/vnd.tcpdump.pcap": string[];
        "application/vnd.tmobile-livetv": string[];
        "application/vnd.trid.tpt": string[];
        "application/vnd.triscape.mxs": string[];
        "application/vnd.trueapp": string[];
        "application/vnd.ufdl": string[];
        "application/vnd.uiq.theme": string[];
        "application/vnd.umajin": string[];
        "application/vnd.unity": string[];
        "application/vnd.uoml+xml": string[];
        "application/vnd.vcx": string[];
        "application/vnd.visio": string[];
        "application/vnd.visionary": string[];
        "application/vnd.vsf": string[];
        "application/vnd.wap.wbxml": string[];
        "application/vnd.wap.wmlc": string[];
        "application/vnd.wap.wmlscriptc": string[];
        "application/vnd.webturbo": string[];
        "application/vnd.wolfram.player": string[];
        "application/vnd.wordperfect": string[];
        "application/vnd.wqd": string[];
        "application/vnd.wt.stf": string[];
        "application/vnd.xara": string[];
        "application/vnd.xfdl": string[];
        "application/vnd.yamaha.hv-dic": string[];
        "application/vnd.yamaha.hv-script": string[];
        "application/vnd.yamaha.hv-voice": string[];
        "application/vnd.yamaha.openscoreformat": string[];
        "application/vnd.yamaha.openscoreformat.osfpvg+xml": string[];
        "application/vnd.yamaha.smaf-audio": string[];
        "application/vnd.yamaha.smaf-phrase": string[];
        "application/vnd.yellowriver-custom-menu": string[];
        "application/vnd.zul": string[];
        "application/vnd.zzazz.deck+xml": string[];
        "application/x-7z-compressed": string[];
        "application/x-abiword": string[];
        "application/x-ace-compressed": string[];
        "application/x-apple-diskimage": string[];
        "application/x-arj": string[];
        "application/x-authorware-bin": string[];
        "application/x-authorware-map": string[];
        "application/x-authorware-seg": string[];
        "application/x-bcpio": string[];
        "application/x-bdoc": string[];
        "application/x-bittorrent": string[];
        "application/x-blender": string[];
        "application/x-blorb": string[];
        "application/x-bzip": string[];
        "application/x-bzip2": string[];
        "application/x-cbr": string[];
        "application/x-cdlink": string[];
        "application/x-cfs-compressed": string[];
        "application/x-chat": string[];
        "application/x-chess-pgn": string[];
        "application/x-chrome-extension": string[];
        "application/x-cocoa": string[];
        "application/x-compressed": string[];
        "application/x-conference": string[];
        "application/x-cpio": string[];
        "application/x-csh": string[];
        "application/x-debian-package": string[];
        "application/x-dgc-compressed": string[];
        "application/x-director": string[];
        "application/x-doom": string[];
        "application/x-dtbncx+xml": string[];
        "application/x-dtbook+xml": string[];
        "application/x-dtbresource+xml": string[];
        "application/x-dvi": string[];
        "application/x-envoy": string[];
        "application/x-eva": string[];
        "application/x-font-bdf": string[];
        "application/x-font-ghostscript": string[];
        "application/x-font-linux-psf": string[];
        "application/x-font-pcf": string[];
        "application/x-font-snf": string[];
        "application/x-font-type1": string[];
        "application/x-freearc": string[];
        "application/x-futuresplash": string[];
        "application/x-gca-compressed": string[];
        "application/x-glulx": string[];
        "application/x-gnumeric": string[];
        "application/x-gramps-xml": string[];
        "application/x-gtar": string[];
        "application/x-hdf": string[];
        "application/x-httpd-php": string[];
        "application/x-install-instructions": string[];
        "application/x-ipynb+json": string[];
        "application/x-iso9660-image": string[];
        "application/x-iwork-keynote-sffkey": string[];
        "application/x-iwork-numbers-sffnumbers": string[];
        "application/x-iwork-pages-sffpages": string[];
        "application/x-java-archive-diff": string[];
        "application/x-java-jnlp-file": string[];
        "application/x-keepass2": string[];
        "application/x-latex": string[];
        "application/x-lua-bytecode": string[];
        "application/x-lzh-compressed": string[];
        "application/x-makeself": string[];
        "application/x-mie": string[];
        "application/x-mobipocket-ebook": string[];
        "application/x-ms-application": string[];
        "application/x-ms-shortcut": string[];
        "application/x-ms-wmd": string[];
        "application/x-ms-wmz": string[];
        "application/x-ms-xbap": string[];
        "application/x-msaccess": string[];
        "application/x-msbinder": string[];
        "application/x-mscardfile": string[];
        "application/x-msclip": string[];
        "application/x-msdos-program": string[];
        "application/x-msdownload": string[];
        "application/x-msmediaview": string[];
        "application/x-msmetafile": string[];
        "application/x-msmoney": string[];
        "application/x-mspublisher": string[];
        "application/x-msschedule": string[];
        "application/x-msterminal": string[];
        "application/x-mswrite": string[];
        "application/x-netcdf": string[];
        "application/x-ns-proxy-autoconfig": string[];
        "application/x-nzb": string[];
        "application/x-perl": string[];
        "application/x-pilot": string[];
        "application/x-pkcs12": string[];
        "application/x-pkcs7-certificates": string[];
        "application/x-pkcs7-certreqresp": string[];
        "application/x-rar-compressed": string[];
        "application/x-redhat-package-manager": string[];
        "application/x-research-info-systems": string[];
        "application/x-sea": string[];
        "application/x-sh": string[];
        "application/x-shar": string[];
        "application/x-shockwave-flash": string[];
        "application/x-silverlight-app": string[];
        "application/x-sql": string[];
        "application/x-stuffit": string[];
        "application/x-stuffitx": string[];
        "application/x-subrip": string[];
        "application/x-sv4cpio": string[];
        "application/x-sv4crc": string[];
        "application/x-t3vm-image": string[];
        "application/x-tads": string[];
        "application/x-tar": string[];
        "application/x-tcl": string[];
        "application/x-tex": string[];
        "application/x-tex-tfm": string[];
        "application/x-texinfo": string[];
        "application/x-tgif": string[];
        "application/x-ustar": string[];
        "application/x-virtualbox-hdd": string[];
        "application/x-virtualbox-ova": string[];
        "application/x-virtualbox-ovf": string[];
        "application/x-virtualbox-vbox": string[];
        "application/x-virtualbox-vbox-extpack": string[];
        "application/x-virtualbox-vdi": string[];
        "application/x-virtualbox-vhd": string[];
        "application/x-virtualbox-vmdk": string[];
        "application/x-wais-source": string[];
        "application/x-web-app-manifest+json": string[];
        "application/x-x509-ca-cert": string[];
        "application/x-xfig": string[];
        "application/x-xliff+xml": string[];
        "application/x-xpinstall": string[];
        "application/x-xz": string[];
        "application/x-zip-compressed": string[];
        "application/x-zmachine": string[];
        "audio/vnd.dece.audio": string[];
        "audio/vnd.digital-winds": string[];
        "audio/vnd.dra": string[];
        "audio/vnd.dts": string[];
        "audio/vnd.dts.hd": string[];
        "audio/vnd.lucent.voice": string[];
        "audio/vnd.ms-playready.media.pya": string[];
        "audio/vnd.nuera.ecelp4800": string[];
        "audio/vnd.nuera.ecelp7470": string[];
        "audio/vnd.nuera.ecelp9600": string[];
        "audio/vnd.rip": string[];
        "audio/x-aac": string[];
        "audio/x-aiff": string[];
        "audio/x-caf": string[];
        "audio/x-flac": string[];
        "audio/x-m4a": string[];
        "audio/x-matroska": string[];
        "audio/x-mpegurl": string[];
        "audio/x-ms-wax": string[];
        "audio/x-ms-wma": string[];
        "audio/x-pn-realaudio": string[];
        "audio/x-pn-realaudio-plugin": string[];
        "audio/x-realaudio": string[];
        "audio/x-wav": string[];
        "chemical/x-cdx": string[];
        "chemical/x-cif": string[];
        "chemical/x-cmdf": string[];
        "chemical/x-cml": string[];
        "chemical/x-csml": string[];
        "chemical/x-xyz": string[];
        "image/prs.btif": string[];
        "image/prs.pti": string[];
        "image/vnd.adobe.photoshop": string[];
        "image/vnd.airzip.accelerator.azv": string[];
        "image/vnd.dece.graphic": string[];
        "image/vnd.djvu": string[];
        "image/vnd.dvb.subtitle": string[];
        "image/vnd.dwg": string[];
        "image/vnd.dxf": string[];
        "image/vnd.fastbidsheet": string[];
        "image/vnd.fpx": string[];
        "image/vnd.fst": string[];
        "image/vnd.fujixerox.edmics-mmr": string[];
        "image/vnd.fujixerox.edmics-rlc": string[];
        "image/vnd.microsoft.icon": string[];
        "image/vnd.ms-dds": string[];
        "image/vnd.ms-modi": string[];
        "image/vnd.ms-photo": string[];
        "image/vnd.net-fpx": string[];
        "image/vnd.pco.b16": string[];
        "image/vnd.tencent.tap": string[];
        "image/vnd.valve.source.texture": string[];
        "image/vnd.wap.wbmp": string[];
        "image/vnd.xiff": string[];
        "image/vnd.zbrush.pcx": string[];
        "image/x-3ds": string[];
        "image/x-adobe-dng": string[];
        "image/x-cmu-raster": string[];
        "image/x-cmx": string[];
        "image/x-freehand": string[];
        "image/x-icon": string[];
        "image/x-jng": string[];
        "image/x-mrsid-image": string[];
        "image/x-ms-bmp": string[];
        "image/x-pcx": string[];
        "image/x-pict": string[];
        "image/x-portable-anymap": string[];
        "image/x-portable-bitmap": string[];
        "image/x-portable-graymap": string[];
        "image/x-portable-pixmap": string[];
        "image/x-rgb": string[];
        "image/x-tga": string[];
        "image/x-xbitmap": string[];
        "image/x-xpixmap": string[];
        "image/x-xwindowdump": string[];
        "message/vnd.wfa.wsc": string[];
        "model/vnd.bary": string[];
        "model/vnd.cld": string[];
        "model/vnd.collada+xml": string[];
        "model/vnd.dwf": string[];
        "model/vnd.gdl": string[];
        "model/vnd.gtw": string[];
        "model/vnd.mts": string[];
        "model/vnd.opengex": string[];
        "model/vnd.parasolid.transmit.binary": string[];
        "model/vnd.parasolid.transmit.text": string[];
        "model/vnd.pytha.pyox": string[];
        "model/vnd.sap.vds": string[];
        "model/vnd.usda": string[];
        "model/vnd.usdz+zip": string[];
        "model/vnd.valve.source.compiled-map": string[];
        "model/vnd.vtu": string[];
        "text/prs.lines.tag": string[];
        "text/vnd.curl": string[];
        "text/vnd.curl.dcurl": string[];
        "text/vnd.curl.mcurl": string[];
        "text/vnd.curl.scurl": string[];
        "text/vnd.dvb.subtitle": string[];
        "text/vnd.familysearch.gedcom": string[];
        "text/vnd.fly": string[];
        "text/vnd.fmi.flexstor": string[];
        "text/vnd.graphviz": string[];
        "text/vnd.in3d.3dml": string[];
        "text/vnd.in3d.spot": string[];
        "text/vnd.sun.j2me.app-descriptor": string[];
        "text/vnd.wap.wml": string[];
        "text/vnd.wap.wmlscript": string[];
        "text/x-asm": string[];
        "text/x-c": string[];
        "text/x-component": string[];
        "text/x-fortran": string[];
        "text/x-handlebars-template": string[];
        "text/x-java-source": string[];
        "text/x-lua": string[];
        "text/x-markdown": string[];
        "text/x-nfo": string[];
        "text/x-opml": string[];
        "text/x-org": string[];
        "text/x-pascal": string[];
        "text/x-processing": string[];
        "text/x-sass": string[];
        "text/x-scss": string[];
        "text/x-setext": string[];
        "text/x-sfv": string[];
        "text/x-suse-ymp": string[];
        "text/x-uuencode": string[];
        "text/x-vcalendar": string[];
        "text/x-vcard": string[];
        "video/vnd.dece.hd": string[];
        "video/vnd.dece.mobile": string[];
        "video/vnd.dece.pd": string[];
        "video/vnd.dece.sd": string[];
        "video/vnd.dece.video": string[];
        "video/vnd.dvb.file": string[];
        "video/vnd.fvt": string[];
        "video/vnd.mpegurl": string[];
        "video/vnd.ms-playready.media.pyv": string[];
        "video/vnd.uvvu.mp4": string[];
        "video/vnd.vivo": string[];
        "video/x-f4v": string[];
        "video/x-fli": string[];
        "video/x-flv": string[];
        "video/x-m4v": string[];
        "video/x-matroska": string[];
        "video/x-mng": string[];
        "video/x-ms-asf": string[];
        "video/x-ms-vob": string[];
        "video/x-ms-wm": string[];
        "video/x-ms-wmv": string[];
        "video/x-ms-wmx": string[];
        "video/x-ms-wvx": string[];
        "video/x-msvideo": string[];
        "video/x-sgi-movie": string[];
        "video/x-smv": string[];
        "x-conference/x-cooltalk": string[];
    };
    export default _default_14;
}
