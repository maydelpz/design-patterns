
interface Subject {
    request(): void;
}


class RealSubject implements Subject {
    public request(): void {
        console.log('RealSubject: Handling request.');
    }
}


class ProxySubject implements Subject {
    private realSubject: RealSubject;

 
    constructor(realSubject: RealSubject, handler: ProxyHandler<RealSubject>) {
        this.realSubject = realSubject;
    }

    public request(): void {
        if (this.checkAccess()) {
            this.realSubject.request();
            this.logAccess();
        }
    }

    private checkAccess(): boolean {
        console.log('Proxy: Checking access prior to firing a real request.');

        return true;
    }

    private logAccess(): void {
        console.log('Proxy: Logging the time of request.');
    }
}


function clientCode(subject: Subject) {
    

    subject.request();

   
}

console.log('Client: Executing the client code with a real subject:');
const realSubject = new RealSubject();
clientCode(realSubject);

console.log('');

console.log('Client: Executing the same client code with a proxy:');
const handler: ProxyHandler<RealSubject> = {
    get: function(target, prop, receiver) {
        console.log(`Proxy: Intercepting ${String(prop)} access.`);
        return Reflect.get(target, prop, receiver);
    }
};
const proxy = new ProxySubject(realSubject, handler);
clientCode(proxy);