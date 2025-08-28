'use server';

import { ErrorResponseSchema, ProductFormSchema } from '@/src/schemas';

type ActionStateType = {
    errors: string[];
    success: string;
}

export async function addProduct(prevState: ActionStateType, formData: FormData) {
    const products = ProductFormSchema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        image: formData.get('image'),
        inventory: formData.get('inventory'),
        categoryId: formData.get('categoryId'),
    });

    console.log(products.data?.image);

    if (!products.success) {
        return {
            errors: products.error.issues.map(issue => issue.message),
            success: '',
        }
    }

    const url = `${process.env.API_URL}/products`;
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(products.data),
    });
    const json = await req.json();

    if (!req.ok) {
        const errors = ErrorResponseSchema.parse(json);
        return {
            errors: errors.message.map(error => error),
            success: '',
        }
    }

    return {
        errors: [],
        success: 'Producto Agregado Correctamente'
    }
}