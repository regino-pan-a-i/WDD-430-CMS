export class Contact {

    public id: string;
    public name: string;
    public email: string;
    public phone:string;
    public imageUrl: string;
    public group?: Contact[] ;

    constructor(
        id: string = "",
        name: string = "",
        email: string = "",
        phone: string = "",
        imageUrl: string = "",
        group: Contact[] | undefined
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.group = group;
    }
}