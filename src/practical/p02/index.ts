import axios from "axios";
type newUser = {
  name: string;
  username?: string;
  email?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  } | null;
  phone: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
//export function addUser(newUser: newUser | null) {}


interface Geo {
  lat: string | null;
  lng: string | null;
}

interface Address {
  street: string | null;
  suite: string | null;
  city: string | null;
  zipcode: string | null;
  geo: Geo | null;
}

interface User {
  id: number;
  name: string | null;
  phone: string | null;
  address: Address | null;
}

interface NewUser {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
    geo?: {
      lat?: string;
      lng?: string;
    };
  } | null;
}

const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function addUser(
  newUserData: newUser | null
): Promise<User[]> {
  try {
    const response = await axios.get<User[]>(API_URL);
    const users = response.data;

    const result: User[] = users.map((ggez) => ({
      id: ggez.id,
      name: ggez.name ?? null,
      phone: ggez.phone ?? null,
      address: ggez.address ?? null,
    }));

    if (!newUserData) {
      return result;
    }

    const lastId = result.length
      ? result[result.length - 1].id
      : 0;

    const address: Address | null = newUserData.address
      ? {
          street: newUserData.address.street ?? null,
          suite: newUserData.address.suite ?? null,
          city: newUserData.address.city ?? null,
          zipcode: newUserData.address.zipcode ?? null,
          geo: newUserData.address.geo
            ? {
                lat: newUserData.address.geo.lat ?? null,
                lng: newUserData.address.geo.lng ?? null,
              }
            : null,
        }
      : null;

    const newUser: User = {
      id: lastId + 1,
      name: newUserData.name ?? null,
      phone: newUserData.phone ?? null,
      address,
    };

    return [...result, newUser];
  } catch {
    return [];
  }
}
