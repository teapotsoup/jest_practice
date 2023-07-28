import userEvent from "@testing-library/user-event";
import {render,screen} from "@testing-library/react";
import App from "../App";


test('happy path', async ()=>{
    const user = userEvent.setup()
    const {unmount} = render(<App/>)
    const vanillaInput = await screen.findByRole('spinbutton',{name:'Vanilla'})
    await user.clear(vanillaInput)
    await user.type(vanillaInput,"1")

    const chocolateInput = await screen.findByRole('spinbutton',{name:'Chocolate'})
    await user.clear(chocolateInput)
    await user.type(chocolateInput,"2")

    const cherriesCheckbox = await screen.findByRole("checkbox",{name:"Cherries"})
    await user.click(cherriesCheckbox)

    const orderSummaryBtn = screen.getByRole("button",{
        name: /Order Sundae!/i
    })

    await user.click(orderSummaryBtn)

    const summaryHeading = screen.getByRole("heading", {name: "Order Summary"})
    expect(summaryHeading).toBeInTheDocument()
    const scoopsHeading = screen.getByRole("heading", {name: "Scoops: $6.00"})
    expect(scoopsHeading).toBeInTheDocument()
    const toppingsHeading = screen.getByRole("heading", {name: "Toppings: $1.50"})
    expect(toppingsHeading).toBeInTheDocument()


    expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
    expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
    expect(screen.getByText('Cherries')).toBeInTheDocument();

    const tcCheckbox = screen.getByRole("checkbox",{
        name: /Terms and Conditions/i
    })
    await user.click(tcCheckbox)

    const orderBtn = screen.getByRole("button",{
        name: 'Confirm order'
    })
    await user.click(orderBtn)

    const thankYouHeader = await screen.findByRole("heading",{name:/Thank You!/i})

    expect(thankYouHeader).toBeInTheDocument();

    const notLoading = screen.queryByText("Loading");
    expect(notLoading).not.toBeInTheDocument()

   const orderNumber = await screen.findByText(/order number/i)

    expect(orderNumber).toBeInTheDocument()

    const newOrderBtn = screen.getByRole("button",{
        name: 'Create new order'
    })
    await user.click(newOrderBtn)

    const scoopsSubtotal =await screen.findByText('Scoops total: $0.00')
    expect(scoopsSubtotal).toBeInTheDocument()

    const toppingsSubtotal =await screen.findByText('Toppings total: $0.00')
    expect(toppingsSubtotal).toBeInTheDocument()

    const vanillaInput2 = await screen.findByRole('spinbutton',{name:'Vanilla'})
    await user.clear(vanillaInput2)
    await user.type(vanillaInput2,"1")

    const GrandTotal =  screen.getByRole('heading', {name:/Grand total: \$/i})
    expect(GrandTotal).toHaveTextContent("2.00")
    unmount();
})

test("Order phases for happy path", async ()=>{
    const user  = userEvent.setup()
    const {unmount} = render(<App/>)
    const vanillaInput = await screen.findByRole('spinbutton',{name:'Vanilla'})
    await user.clear(vanillaInput)
    await user.type(vanillaInput,"1")
    const orderSummaryBtn = screen.getByRole("button",{
        name: /Order Sundae!/i
    })
    await user.click(orderSummaryBtn)

    const tcCheckbox = screen.getByRole("checkbox",{
        name: /Terms and Conditions/i
    })
    await user.click(tcCheckbox)

    const orderBtn = screen.getByRole("button",{
        name: /Confirm order/i
    })
    await user.click(orderBtn)

    const Loading = screen.getByText(/Loading/i);
    expect(Loading).toBeInTheDocument()


    const thankYouHeader = await screen.findByRole("heading",{name:/Thank You!/i})

    expect(thankYouHeader).toBeInTheDocument();
})

test("Toppings header is not on summary page if no toppings ordered", async ()=>{
    const user = userEvent.setup()
    render(<App/>)
    const vanillaInput = await screen.findByRole('spinbutton',{name:'Vanilla'})
    await user.clear(vanillaInput)
    await user.type(vanillaInput,"1")

    const chocolateInput = await screen.findByRole('spinbutton',{name:'Chocolate'})
    await user.clear(chocolateInput)
    await user.type(chocolateInput,"2")


    const orderSummaryBtn = screen.getByRole("button",{
        name: /Order Sundae!/i
    })

    await user.click(orderSummaryBtn)

    const scoopsHeading = screen.getByRole("heading",{
        name: 'Scoops: $6.00'
    })
    expect(scoopsHeading).toBeInTheDocument()

    const toppingsHeading = screen.queryByRole("heading",{
        name: /Toppings/i
    })
    expect(toppingsHeading).not.toBeInTheDocument()
})