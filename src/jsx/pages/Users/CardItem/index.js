import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { Translate } from "../../../Enums/Tranlate";
import DeleteModal from "../../../common/DeleteModal";
import UserService from "../../../../services/UserService";

const CardItem = ({ item, index, setShouldUpdate }) => {
  const [phone, setPhone] = useState({
    country_code:'',
    phone:''
  });
  const [status, setStatus] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const Auth = useSelector((state) => state.auth?.auth);
  const lang = useSelector((state) => state.auth?.lang);
  const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);
  const userService = new UserService();

  useEffect(() => {
    setStatus(item.isBlocked);
    if(!!item?.user_phones?.length){
      let data = item?.user_phones?.filter(res=> res?.is_default)
      setPhone({
        country_code: data[0]?.country_code,
        phone: data[0]?.phone
      })
    }
  }, [item]);

  return (
    <tr key={index} className="text-center">
      <td>
        <strong>{item.id}</strong>
      </td>
      <td>
        {item.f_name ? (
          <p
            className="mb-0 user"
            style={{
              fontWeight: !!item.f_name && "800",
              opacity: ".75",
              textTransform: "capitalize",
              cursor: "pointer",
            }}
          >
            {item.f_name} {item.l_name}
          </p>
        ) : (
          "-"
        )}
      </td>
      <td>{item.email || "-"}</td>
      <td>
        {phone?.country_code}
        {phone?.phone || "-"}
      </td>
      <td>
        <Form.Check
          type="switch"
          id={`custom-switch${index}`}
          checked={!status}
        />
      </td>
      <td>
        <Form.Check
          type="switch"
          id={`isVerified${index}`}
          checked={item.isVerified}
        />
      </td>
      <td>
        {isExist("users") && (
          <Dropdown>
            <Dropdown.Toggle
              // variant="success"
              className="light sharp i-false"
            >
              <i className="la la-ellipsis-v" style={{ fontSize: "27px" }}></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setDeleteModal(true)}>
                {Translate[lang].delete}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </td>
      {deleteModal && (
        <DeleteModal
          open={deleteModal}
          titleMsg={lang === "en" ? item.title_en : item.title_ar}
          deletedItem={item}
          modelService={userService}
          onCloseModal={setDeleteModal}
          setShouldUpdate={setShouldUpdate}
        />
      )}
    </tr>
  );
};
export default CardItem;
