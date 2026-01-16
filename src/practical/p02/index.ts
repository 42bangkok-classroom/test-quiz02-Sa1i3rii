import axios from "axios";

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
  };
}


const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function addUser(
  newUserData: NewUser | null
): Promise<User[]> {
  try {
    const response = await axios.get<User[]>(API_URL);
    const users = response.data;

    
    const result: User[] = users.map((user) => ({
      id: user.id,
      name: user.name ?? null,
      phone: user.phone ?? null,
      address: user.address ?? null,
    }));

    if (!newUserData) {
      return result;
    }


    const newUser = createUserFromData(newUserData, result);
    return [...result, newUser];
  } catch {
    return [];
  }
}

function createUserFromData(data: NewUser, existingUsers: User[]): User {
  const lastId = existingUsers.length ? existingUsers[existingUsers.length - 1].id : 0;

  const address: Address | null = data.address
    ? {
        street: data.address.street ?? null,
        suite: data.address.suite ?? null,
        city: data.address.city ?? null,
        zipcode: data.address.zipcode ?? null,
        geo: data.address.geo
          ? {
              lat: data.address.geo.lat ?? null,
              lng: data.address.geo.lng ?? null,
            }
          : null,
      }
    : null;

  return {
    id: lastId + 1,
    name: data.name ?? null,
    phone: data.phone ?? null,
    address,
  };
}
