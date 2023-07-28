import Options from "../Options";
import {render, screen} from "../../../test-utils/testing-library-util";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  /**
   * toBe : 일반 적인 숫자나 문자
   * toEqual : 배열과 객체
   */
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each toppings from server", async () => {
  render(<Options optionType="toppings" />);

  // find images
  const images = await screen.findAllByRole("img", { name: /topping$/i });
  expect(images).toHaveLength(3);

  // confirm alt text of images
  const altTitles = images.map((img) => img.alt);
  /**
   * toBe : 일반 적인 숫자나 문자
   * toEqual : 배열과 객체
   */
  expect(altTitles).toEqual(["Cherries topping", "M&Ms topping","Hot fudge topping"]);
});