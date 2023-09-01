import useGenre from "@/Hooks/useGenre";
import { Form, Input, Select, SelectProps } from "antd";

interface GenreSelectProps {
  genreIds: number[];
}
export function GenreSelect({ genreIds, onChange }: GenreSelectProps & SelectProps<number[]>) {
  // console.log(genreIds, "asd");
  const { data: genreList } = useGenre();
  const options: SelectProps["options"] = genreList?.genres.map((a) => {
    return { value: a.id, label: a.name };
  });

  return (
    <Form.Item label={"Genres"}>
      <Select mode="multiple" value={genreIds} onChange={onChange} options={options} />
    </Form.Item>
  );
}
