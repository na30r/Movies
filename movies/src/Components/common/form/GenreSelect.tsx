import { Form, Input, Select, SelectProps as AntSelectProps, SelectProps } from "antd";
import useGenre from "../../../Hooks/useGenre";

interface GenreSelectProps {
  genreIds: number[];
}
export function GenreSelect({ genreIds, onChange }: GenreSelectProps & SelectProps<number[]>) {
  console.log(genreIds, "asd");
  const { data: genreList } = useGenre();
  const options: AntSelectProps["options"] = genreList?.genres.map((a) => {
    return { value: a.id, label: a.name };
  });

  return (
    <Form.Item label={"Genres"}>
      <Select mode="multiple" value={genreIds} onChange={onChange} options={options} />
    </Form.Item>
  );
}
