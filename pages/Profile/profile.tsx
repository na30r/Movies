import React from "react";

export default function Profile() {
  return <div>profile</div>;
}

// import { useState } from "react";

// import { Row, Col, Card, Button, Avatar, Radio, Form, Image } from "antd";
// import { Input } from "antd";

// import { VerticalAlignTopOutlined, CloseOutlined, RightCircleOutlined } from "@ant-design/icons";

// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
// import { Movie } from "@/Models/Movie";
// import { pencil } from "@/assets/svg-files";
// import { removeMovieFavorite, removeWatchLater } from "@/redux/Profile";
// import { selectIsAuthenticated, setProfileInfo } from "@/redux/auth";
// import { BACK_PATH } from "@/utils/constants";

// function Profile() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { TextArea } = Input;
//   const profileSelector = useSelector((a: any) => a.auth.user);
//   const userMoviesSelector = useSelector((a: any) => a.Profile);
//   console.log(profileSelector);
//   const isUserLoggedIn = useSelector(selectIsAuthenticated);

//   const [imageURL, setImageURL] = useState(false);
//   const [, setLoading] = useState(false);
//   const [isEditMode, setisEditMode] = useState<boolean>(false);
//   const [profile, setprofile] = useState(profileSelector);

//   const getBase64 = (img: any, callback: any) => {
//     const reader = new FileReader();
//     reader.addEventListener("load", () => callback(reader.result));
//     reader.readAsDataURL(img);
//   };

//   const formChange = (target: any) => {
//     setprofile({ ...profile, [target.name]: target.value });
//   };

//   const handleChange = (info: any) => {
//     if (info.file.status === "uploading") {
//       setLoading(false);
//       return;
//     }
//     if (info.file.status === "done") {
//       getBase64(info.file.originFileObj, (imageUrl: any) => {
//         setLoading(false);
//         setImageURL(false);
//       });
//     }
//   };

//   return (
//     <>
//       {/* <div className="profile-nav-bg" style={{ backgroundImage: "url(" + BgProfile + ")" }}></div> */}
//       <Card
//         className="card-profile-head"
//         bodyStyle={{ display: "none" }}
//         title={
//           <Row justify="space-between" align="middle" gutter={[24, 0]}>
//             <Col span={24} md={12} className="col-info">
//               <Avatar.Group>
//                 <Avatar
//                   size={74}
//                   shape="square"
//                   // src={profilavatar}
//                 />

//                 <div className="avatar-info">
//                   <h4 className="font-semibold m-0">Sarah Jacob</h4>
//                   <p>CEO / Co-Founder</p>
//                 </div>
//               </Avatar.Group>
//             </Col>
//             <Col
//               span={24}
//               md={12}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "flex-end",
//               }}>
//               <Radio.Group defaultValue="a">
//                 <Radio.Button value="a">OVERVIEW</Radio.Button>
//                 <Radio.Button value="b">TEAMS</Radio.Button>
//                 <Radio.Button value="c">PROJECTS</Radio.Button>
//               </Radio.Group>
//             </Col>
//           </Row>
//         }></Card>
//       {console.log("render")}
//       <Row gutter={[24, 0]}>
//         {/* <Col span={24} md={8} className="mb-24 ">
//           <Card
//             bordered={false}
//             className="header-solid h-full"
//             title={<h6 className="font-semibold m-0">Platform Settings</h6>}
//           >
//             <ul className="list settings-list">
//               <li>
//                 <h6 className="list-header text-sm text-muted">ACCOUNT</h6>
//               </li>
//               <li>
//                 <Switch defaultChecked />

//                 <span>Email me when someone follows me</span>
//               </li>
//               <li>
//                 <Switch />
//                 <span>Email me when someone answers me</span>
//               </li>
//               <li>
//                 <Switch defaultChecked />
//                 <span>Email me when someone mentions me</span>
//               </li>
//               <li>
//                 <h6 className="list-header text-sm text-muted m-0">
//                   APPLICATION
//                 </h6>
//               </li>
//               <li>
//                 <Switch defaultChecked />
//                 <span>New launches and projects</span>
//               </li>
//               <li>
//                 <Switch defaultChecked />
//                 <span>Monthly product updates</span>
//               </li>
//               <li>
//                 <Switch defaultChecked />
//                 <span>Subscribe to newsletter</span>
//               </li>
//             </ul>
//           </Card>
//         </Col> */}
//         <Col span={24} md={8} className="mb-24">
//           <Card
//             bordered={false}
//             title={<h6 className="font-semibold m-0">Profile Information</h6>}
//             className="header-solid h-full card-profile-information"
//             extra={
//               <Button type="link" onClick={() => setisEditMode(!isEditMode)}>
//                 {pencil}
//               </Button>
//             }
//             bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}>
//             <p className="text-dark">
//               {" "}
//               <Form
//                 layout="vertical"
//                 // initialValues={{ requiredMarkValue: requiredMark }}
//                 // onValuesChange={onRequiredTypeChange}
//                 // requiredMark={requiredMark}
//               >
//                 <Form.Item label="fullname" tooltip="This is a required field">
//                   {isEditMode ? (
//                     <Input
//                       name="fullname"
//                       defaultValue={profileSelector.fullname}
//                       onChange={(e) => formChange(e.target)}></Input>
//                   ) : (
//                     profileSelector.fullname
//                   )}
//                 </Form.Item>
//                 <Form.Item label="phone">
//                   {isEditMode ? (
//                     <Input
//                       name="phone"
//                       defaultValue={profileSelector.phone}
//                       onChange={(e) => formChange(e.target)}></Input>
//                   ) : (
//                     profileSelector.phone
//                   )}
//                 </Form.Item>
//                 <Form.Item label="email">
//                   {isEditMode ? (
//                     <Input
//                       name="email"
//                       defaultValue={profileSelector.email}
//                       onChange={(e) => formChange(e.target)}></Input>
//                   ) : (
//                     profileSelector.email
//                   )}
//                 </Form.Item>
//                 <Form.Item label="location">
//                   {isEditMode ? (
//                     <Input
//                       name="location"
//                       defaultValue={profileSelector.location}
//                       onChange={(e) => formChange(e.target)}></Input>
//                   ) : (
//                     profileSelector.location
//                   )}
//                 </Form.Item>
//                 <Form.Item label="description">
//                   {isEditMode ? (
//                     <TextArea
//                       defaultValue={profileSelector.description}
//                       rows={4}
//                       name="description"
//                       onChange={(e) => formChange(e.target)}
//                     />
//                   ) : (
//                     profileSelector.description
//                   )}
//                 </Form.Item>
//                 {!isEditMode || (
//                   <Form.Item>
//                     <Button
//                       type="primary"
//                       onClick={() => {
//                         dispatch(setProfileInfo(profile));
//                         setisEditMode(!isEditMode);
//                       }}>
//                       Submit
//                     </Button>
//                   </Form.Item>
//                 )}
//               </Form>
//             </p>
//           </Card>
//         </Col>
//       </Row>
//       <Col span={24} md={8} className="mb-24">
//         {/* <Card
//             bordered={false}
//             title={<h6 className="font-semibold m-0">Conversations</h6>}
//             className="header-solid h-full"
//             bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
//           >
//             <List
//               itemLayout="horizontal"
//               dataSource={data}
//               split={false}
//               className="conversations-list"
//               renderItem={(item) => (
//                 <List.Item actions={[<Button type="link">REPLY</Button>]}>
//                   <List.Item.Meta
//                     avatar={
//                       <Avatar shape="square" size={48} src={item.avatar} />
//                     }
//                     title={item.title}
//                     description={item.description}
//                   />
//                 </List.Item>
//               )}
//             />
//           </Card> */}
//       </Col>
//       <Card
//         bordered={false}
//         className="header-solid mb-24"
//         title={
//           <>
//             <h6 className="font-semibold"> My favorite Movies</h6>
//           </>
//         }>
//         <Row gutter={[24, 24]}>
//           {userMoviesSelector.favorite?.map((p: Movie, index: any) => (
//             <Col span={24} md={12} xl={6} key={index}>
//               <Card
//                 bordered={false}
//                 className="card-project"
//                 cover={<Image alt="example" src={BACK_PATH + p.backdrop_path} />}
//                 actions={[
//                   <Button
//                     key="detail"
//                     onClick={() => router.push(`/movies/detail/${p.id}`)}
//                     type="primary"
//                     shape="round"
//                     icon={<RightCircleOutlined />}>
//                     Movie Detail
//                   </Button>,
//                   <Button
//                     key={"remove"}
//                     onClick={() => dispatch(removeMovieFavorite(p))}
//                     type="primary"
//                     shape="round"
//                     icon={<CloseOutlined />}
//                     danger>
//                     Remove
//                   </Button>,
//                 ]}>
//                 <div className="card-tag">{p.title} </div>
//                 <Row gutter={[6, 0]} className="card-footer"></Row>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Card>
//       {console.log(isUserLoggedIn, "asdf")}
//       <Card
//         bordered={false}
//         className="header-solid mb-24"
//         title={
//           <>
//             <h6 className="font-semibold"> watch later</h6>
//           </>
//         }>
//         <Row gutter={[24, 24]}>
//           {userMoviesSelector.watchLater?.map((p: Movie, index: any) => (
//             <Col span={24} md={12} xl={6} key={index}>
//               <Card
//                 bordered={false}
//                 className="card-project"
//                 cover={<Image alt="example" src={BACK_PATH + p.backdrop_path} />}
//                 actions={[
//                   <Button
//                     onClick={() => router.push(`/movies/detail/${p.id}`)}
//                     key="detail"
//                     type="primary"
//                     shape="round"
//                     icon={<RightCircleOutlined />}>
//                     Movie Detail
//                   </Button>,
//                   <Button
//                     onClick={() => dispatch(removeWatchLater(p))}
//                     key="remove"
//                     type="primary"
//                     shape="round"
//                     icon={<CloseOutlined />}
//                     danger>
//                     Remove
//                   </Button>,
//                 ]}>
//                 {" "}
//                 <div className="card-tag">{p.title} </div>
//                 <Row gutter={[6, 0]} className="card-footer"></Row>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Card>

//       {/* <Card
//         bordered={false}
//         className="header-solid mb-24"
//         title={
//           <>
//             <h6 className="font-semibold">Projects</h6>
//             <p>Architects design houses</p>
//           </>
//         }
//       >
//         <Row gutter={[24, 24]}>
//           {project.map((p, index) => (
//             <Col span={24} md={12} xl={6} key={index}>
//               <Card
//                 bordered={false}
//                 className="card-project"
//                 cover={<img alt="example" src={p.img} />}
//               >
//                 <div className="card-tag">{p.titlesub}</div>
//                 <h5>{p.title}</h5>
//                 <p>{p.disciption}</p>
//                 <Row gutter={[6, 0]} className="card-footer">
//                   <Col span={12}>
//                     <Button>VIEW PROJECT</Button>
//                   </Col>
//                   <Col span={12} className="text-right">
//                     <Avatar.Group className="avatar-chips">
//                       <Avatar size="small" src={profilavatar} />
//                       <Avatar size="small" src={convesionImg} />
//                       <Avatar size="small" src={convesionImg2} />
//                       <Avatar size="small" src={convesionImg3} />
//                     </Avatar.Group>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Card> */}
//     </>
//   );
// }

// export default Profile;
