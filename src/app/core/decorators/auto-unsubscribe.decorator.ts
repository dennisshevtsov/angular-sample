export function AutoUnsubscribeDecorator(subName: string = 'sub') {
  return (constructor: any) => {
    const original: any = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function() {
      const sub: any = this[subName];

      sub?.unsubsribe();

      if (original && (typeof original === 'function')) {
        original.apply(this, arguments);

        console.log(`Unsubscribe decorator is called. Subscription name is: ${subName}.`);
      }
    };
  };
}
