import { NextFunction, Request, Response } from "express";
import { Contact } from "../models/contact.model";
import { ContactDTO } from "../dtos/contact.dto";
import { ApiReponse } from "../core/response";

// for now, hardcoded data... 
const CONTACTS_DATA: Contact[] = [
    {
        uid: crypto.randomUUID(),
        name: "Alice Johnson",
        phoneNumber: "+1-555-123-4567",
        email: "alice.j@example.com",
        address: "123 Oak St, Anytown, USA"
    },
    {
        uid: crypto.randomUUID(),
        name: "Bob Smith",
        phoneNumber: "+1-555-987-6543",
        email: "bob.s@workplace.net",
        address: "45 River Rd, Cityville, CA"
    },
    {
        uid: crypto.randomUUID(),
        name: "Charlie Brown",
        phoneNumber: "+1-555-333-2222",
        // Email and Address are optional, so we omit them here
    },
    {
        uid: crypto.randomUUID(),
        name: "Diana Prince",
        phoneNumber: "+1-555-777-8888",
        email: "diana.p@justice.org"
    },
    {
        uid: crypto.randomUUID(),
        name: "Ethan Hunt",
        phoneNumber: "+44-20-7946-0958", // UK number example
        address: "10 Downing St, London, UK"
    },
    {
        uid: crypto.randomUUID(),
        name: "Fiona Glenn",
        phoneNumber: "+33-1-40-00-00-00", // French number example
        email: "fiona.g@europe.fr",
        address: "24 Rue de Rivoli, Paris, France"
    },
    {
        uid: crypto.randomUUID(),
        name: "George Miller",
        phoneNumber: "+1-555-000-1111",
        email: "george.m@mail.com",
        address: "99 Maple Ave, Suburbia, TX"
    },
    {
        uid: crypto.randomUUID(),
        name: "Hannah Lee",
        phoneNumber: "+1-555-444-5555",
        // Email and Address are optional, so we omit them here
    },
    {
        uid: crypto.randomUUID(),
        name: "Isaac Newton",
        phoneNumber: "+1-555-666-7777",
        email: "isaac.n@science.edu",
        address: "The Royal Society, London"
    },
    {
        uid: crypto.randomUUID(),
        name: "Jasmine Kaur",
        phoneNumber: "+91-98765-43210", // Indian number example
        email: "jasmine.k@techcorp.in",
        address: "56 Cyber City, Gurgaon, India"
    }
];

export const getContacts = (_: Request, res: Response, __: NextFunction) => {
    try {
        const contacts: ContactDTO[] = CONTACTS_DATA.map((c) => ({ name: c.name, phone: c.phoneNumber, address: c.address, email: c.email } as ContactDTO));
        res.status(200).json({ success: true, message: contacts.length + ' contacts found', data: contacts } as ApiReponse<Array<ContactDTO>>);
    } catch (err) {
        console.error('[ContactsController]: getContacts - Something went wrong retrieving contacts: ', err)
    }
}

export const getContactByName = (req: Request, res: Response, __: NextFunction) => {
    try {

        const name:string = req.params['name'] || '';

        // This must be in the bussiness layer
        const contacts: ContactDTO[] = CONTACTS_DATA.map((c) => ({ name: c.name, phone: c.phoneNumber, address: c.address, email: c.email } as ContactDTO));
        
        const contact: ContactDTO | undefined = contacts.find((x) => x.name.includes(name));

        res.status(200).json({ success: true, message: contact ? 'Contact found' : 'Not found', data: contact ?? null } as ApiReponse<ContactDTO>);
    } catch (err) {
        console.error('[ContactsController]: getContactByName - Something went wrong retrieving the contact: ', err)
    }
}