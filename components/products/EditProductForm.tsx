"use client";

import { updateProduct } from '@/actions/edit-product-action';
import { useParams, useRouter } from 'next/navigation';
import { ReactNode, useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function EditProductForm({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { id } = useParams<{id: string}>();

    const updateProductWithId = updateProduct.bind(null, +id);
    const [state, dispatch] = useActionState(updateProductWithId, {
        errors: [],
        success: '',
    });

    useEffect(() => {
        if (state.errors) {
            state.errors.map(error => toast.error(error));
        }
        if (state.success) {
            toast.success(state.success);
            router.push('/admin/products?page=1');
        }
    }, [state, router]);

    return (
        <form
            className='space-y-5'
            action={dispatch}
        >
            {children}
            <input
                type='submit'
                className='rounded bg-green-400 font-bold py-2 w-full cursor-pointer'
                value={'Guardar Cambios'}
            />
        </form>
    )
}
