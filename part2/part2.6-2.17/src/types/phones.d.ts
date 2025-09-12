interface IPhone {    
    id:number;
    name:string,
    number:string        
}

type IphoneWithoutId = Omit<IPhone,'id'>