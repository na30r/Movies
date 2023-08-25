import { Form, Select, SelectProps } from "antd";
import { useState } from "react";
import usePersonSearch from "../../../Hooks/usePersonSearch";
import { Person } from "../../../Models/Person";
import { IMAGE_PATH } from "../../../utils/constants";

export function ActorSelect({ onChange }: SelectProps<string>) {
  const [personSearchSelect, setpersonSearchSelect] = useState<string>();
  const { data: personSearchList, isLoading: personSearchIsLoading } = usePersonSearch(personSearchSelect ?? " ");

  return (
    <Form.Item label="Actor">
      <Select
        showSearch
        placeholder="Select an Actor"
        showArrow={false}
        filterOption={false}
        onChange={onChange}
        onSearch={(e) => {
          e.length > 2 && setpersonSearchSelect(e);
        }}
        style={{ width: "100%" }}
        loading={personSearchIsLoading}>
        {personSearchList?.results.map((person: Person) => (
          <Select.Option key={person.id} value={person.id}>
            <img src={`${IMAGE_PATH}${person.profile_path}`} alt={person.name} style={{ width: 16, marginRight: 8 }} />
            {person.name} / <small>{person.known_for_department} </small>
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}
