import { Form } from "antd";
import Select, { SelectProps } from "antd/es/select";

export function MovieYearSelect({ onChange }: SelectProps<string>) {
  const years = Array.from({ length: 2031 - 1990 }, (_, index) => 1990 + index).reverse();

  return (
    <Form.Item label="Year">
      <Select placeholder="Select a year" style={{ width: 200 }} onChange={onChange}>
        {years.map((year) => (
          <Select.Option key={year} value={year}>
            {year}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}
