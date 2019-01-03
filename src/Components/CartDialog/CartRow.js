import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { showCartDlg, deleteCartItem, updateCartItemQnt } from "../../Redux/Actions"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

/*
 * Represents a single item row in the table.
 */
const CartRow = (props) => {
    let {item} = props;
    return (
        <TableRow>
            <TableCell>
                <Link to={`/details/${item._id}`}>
                    <div onClick={() => {
                        /*
                         * User will be navigated to item URL by clicking this item due to link above,
                         * and also we close this dialog.
                         */
                        props.dispatch(showCartDlg(false))
                    }}>
                        {item.title}
                    </div>
                </Link>

            </TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>
                <TextField type="number"
                           style={{ width: 40 }}
                           value={item.quantity}
                           onChange={(e) => {
                               let quantity=parseInt(e.target.value, 10);
                               if (quantity < 0) return;

                               /* Update quantity for this cart item. */
                               props.dispatch(updateCartItemQnt({
                                   _id: item._id,
                                   quantity
                               }))
                           }} />
            </TableCell>
            <TableCell>
                <Button
                    color="secondary"
                    onClick={() => {
                        /* Delete this cart item. */
                        props.dispatch(deleteCartItem(item._id))
                    }}>
                    Delete
                </Button>
            </TableCell>

        </TableRow>
    )
};

export default CartRow ;
