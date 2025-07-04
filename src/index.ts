export class ExternalIntegrationsHelper {
    private static instance: ExternalIntegrationsHelper;
    observerList: any = []
    public subscribe(observer: any) {
        this.observerList.push(observer)

    }
    public updateContext(args: any) {
        console.log("we-notify-x")
        this.observerList.forEach((element: any) => {
            element.instantiateClient();
            element.update(args);
            console.log("we-notify-1");
            console.log("we-notify", args);
        });
        // const provider = new WebEngageProvider();
        // provider.sendUserContext(args);
    }
    /**
     * @deprecated Use logEventSeparately instead and choose specific providers
     */
    public logEvent(eventName: string, args: any) {
        console.log("we-notify-event")
        this.observerList.forEach((element: any) => {
            element.instantiateClient();
            element.sendEvent(eventName, args);
            console.log("we-notify-1");
            console.log("we-notify", args);
        });
    }
    public logEventSeparately(eventName: string, whitelist: string[], args: any[]) {
        this.observerList.forEach((element: any) => {
            element.instantiateClient();
            const argsIndex = whitelist.indexOf(element.name);
            if (argsIndex >= 0) {
                element.sendEvent(eventName, args[argsIndex]);
            }
        });
    }
    public static getInstance() {
        if (!ExternalIntegrationsHelper.instance) {
            ExternalIntegrationsHelper.instance = new ExternalIntegrationsHelper();
        }
        return ExternalIntegrationsHelper.instance;
    }
}
