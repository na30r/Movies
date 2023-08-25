import { Form, Select, SelectProps } from "antd";
import { sortBy } from "../../../Models/MovieParams";

const sortByOptions: { label: string; value: sortBy }[] = [
  { label: "popularity", value: "popularity.desc" },
  { label: "revenue desc", value: "revenue.desc" },
  { label: "revenue asc", value: "revenue.asc" },
  { label: "release date desc", value: "primary_release_date.desc" },
  { label: "release date asc", value: "primary_release_date.asc" },
  { label: "vote count desc", value: "vote_count.desc" },
  { label: "vote average desc", value: "vote_average.desc" },
  { label: "vote average asc", value: "vote_average.asc" },
];

export function MovieSortbySelect({ onChange }: SelectProps<string>) {
  return (
    <Form.Item label="Sortby">
      <Select style={{ width: "100%" }} onChange={onChange}>
        {sortByOptions.map((a) => (
          <Select.Option key={a.value} value={a.value}>
            {a.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}
