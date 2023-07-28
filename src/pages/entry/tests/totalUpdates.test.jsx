import {render, screen, waitFor} from "../../../test-utils/testing-library-util";
import userEvent from "@testing-library/user-event";
import Options from '../Options'
import OrderEntry from "../OrderEntry";

// test("update scoop subtotal", async()=>{
//     const user = userEvent.setup()
//     render(<Options optionType="scoops"/>)
//
//     const scoopsSubtotal = screen.getByText('Scoops total: $',{exact: false})
//     expect(scoopsSubtotal).toHaveTextContent('0.00')
//
//     const vanillaInput = await screen.findByRole('spinbutton',{name:'Vanilla'})
//
//     await user.clear(vanillaInput)
//     await user.type(vanillaInput,"1")
//     expect(scoopsSubtotal).toHaveTextContent("2.00")
//
//     const chocolateInput = await screen.findByRole('spinbutton',{name:'Chocolate'})
//
//     await user.clear(chocolateInput)
//     await user.type(chocolateInput,"2")
//     expect(scoopsSubtotal).toHaveTextContent("6.00")
// });


// test("Topping Subtotal", async()=>{
//     const user = userEvent.setup()
//     render(<Options optionType="toppings"/>)
//
//     const toppingsTotal = screen.getByText('Toppings total: $',{exact: false})
//     expect(toppingsTotal).toHaveTextContent("0.00")
//
//     const cherriesCheckbox = await screen.findByRole("checkbox",{name:"Cherries"})
//     const mandmsCheckbox = await screen.findByRole("checkbox",{name:"M&Ms"})
//     await user.click(cherriesCheckbox)
//     expect(toppingsTotal).toHaveTextContent("1.50");
//     await user.click(mandmsCheckbox)
//     expect(toppingsTotal).toHaveTextContent("3.00");
//     await user.click(mandmsCheckbox)
//     expect(toppingsTotal).toHaveTextContent("1.50");
//
// })


describe('grand total',  ()=>{
    test('grand total starts at $0.00',  ()=>{
        const {unmount} = render(<OrderEntry/>)
        const GrandTotal =  screen.getByRole('heading',{name:/Grand total: \$/i})
        expect(GrandTotal).toHaveTextContent("0.00")
        unmount();
    })
    test('grand total updates properly if scoop is added first', async ()=>{
        const user = userEvent.setup()
        const {unmount} = render(<OrderEntry/>)
        const GrandTotal =  screen.getByRole('heading',{name:/Grand total: \$/i})
        const vanillaInput = await screen.findByRole('spinbutton',{name:'Vanilla'})
        await user.clear(vanillaInput)
        await user.type(vanillaInput,"1")
        expect(GrandTotal).toHaveTextContent("2.00")
        unmount();
    })
    test('grand total updates properly if topping is added first', async ()=>{
        const user = userEvent.setup()
        const {unmount} = render(<OrderEntry/>)
        const GrandTotal =  screen.getByRole('heading',{name:/Grand total: \$/i})
        const cherriesCheckbox = await screen.findByRole('checkbox',{name:"Cherries"})
        await user.click(cherriesCheckbox)
        expect(GrandTotal).toHaveTextContent("1.50")
        unmount();
    })
    test('grand total updates properly if item is removed', async ()=>{
        const user = userEvent.setup()
        const {unmount} = render(<OrderEntry/>)
        const GrandTotal =  screen.getByRole('heading', {name:/Grand total: \$/i})
        const chocolateInput = await screen.findByRole('spinbutton',{name: 'Chocolate'})
        const mandmsCheckbox = await screen.findByRole('checkbox', {name:'M&Ms'})
        await user.clear(chocolateInput)
        await user.type(chocolateInput,"1")
        expect(GrandTotal).toHaveTextContent("2.00")
        await user.click(mandmsCheckbox)
        expect(GrandTotal).toHaveTextContent("3.50")
        await user.type(chocolateInput,"0")
        expect(GrandTotal).toHaveTextContent("1.50")
        await user.click(mandmsCheckbox)
        expect(GrandTotal).toHaveTextContent("0.00")
        unmount();
    })
})

