import {render, screen, waitFor} from "../../../test-utils/testing-library-util";

import OrderEntry from "../OrderEntry";
import {rest} from 'msw'
import {server} from '../../../mocks/server'
import userEvent from "@testing-library/user-event";

test('handles err scoop & topping', async ()=>{
    server.resetHandlers(
        rest.get(
            'http://localhost:3030/scoops', (req,res,ctx)=> res(ctx.status(500))
        ),
        rest.get(
            'http://localhost:3030/toppings', (req,res,ctx)=> res(ctx.status(500))
        )
    )
    render(<OrderEntry/>)

    const alerts = await screen.findAllByRole('alert')
    // const popover = screen.getByText(/No ice cream will actually be delivered/i);
    expect(alerts).toHaveLength(2)
})


test('disable order btn if there are no scoops ordered', async ()=>{
    const user = userEvent.setup()
    render(<OrderEntry setOrderPhase={jest.fn()}/>)
    const orderButton =screen.getByRole('button',{name:/Order Sundae!/i})
    expect(orderButton).toBeDisabled()
    const vanillaInput = await screen.findByRole('spinbutton',{name:'Vanilla'})
    await user.clear(vanillaInput)
    await user.type(vanillaInput,"1")
    expect(orderButton).toBeEnabled()
})