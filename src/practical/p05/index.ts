import axios from "axios";

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface ApiUser {
  id: number;
  name: string;
  phone: string;
  address?: Address;
}

interface User {
  id: number;
  name: string;
  phone: string;
  address: Address | null;
}

export async function safeFetchUser(
  userId: number
): Promise<User | null> {
  try {
    // invalid id
    if (userId <= 0) {
      return null;
    }

    const response = await axios.get<ApiUser[]>(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.data) {
      return null;
    }

    const user = response.data.find((ggez) => ggez.id === userId);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address ?? null,
    };
  } catch {
    return null;
  }
}
