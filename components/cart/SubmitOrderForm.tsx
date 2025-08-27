import { submitOrder } from '@/actions/submit-order-action'
import { useStore } from '@/src/store';
import { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify';

export default function SubmitOrderForm() {
    const { total, contents, clearOrder } = useStore();
    const coupon = useStore(state => state.coupon.name);

    const order = { total, coupon, contents };

    const submitOrderWithData = submitOrder.bind(null, order);
    const [state, dispatch] = useActionState(submitOrderWithData, {
        errors: [],
        success: '',
    });

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(error => toast.error(error));
        }
        if (state.success) {
            toast.success(state.success);
            clearOrder();
        }
    }, [state, clearOrder]);

    return (
        <form
            action={dispatch}
        >
            <input
                type='submit'
                className='mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3 cursor-pointer'
                value={'Confirmar compra'}
            />
        </form>
    )
}
