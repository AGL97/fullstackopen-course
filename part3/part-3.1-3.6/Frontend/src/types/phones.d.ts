interface IResponse{
   error?:string,
   message?:string,
   url:string,
   html?:string,
}

interface IPhoneResponse extends IResponse {  
    data?:IPhone          
}

interface IPhonesResponse extends IResponse {  
    data?:IPhone[]          
}

interface IPhone{
    id:number,
    name:string,
    number:string
}

type IphoneWithoutId = Omit<IPhone,'id'>