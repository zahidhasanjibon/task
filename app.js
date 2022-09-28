let res = [];
const fetchJson = () => {
  fetch("./texts.json")
    .then((res) => res.json())
    .then((data) => {
      let res = getVariables(data);
      console.log(res);
    });
};

fetchJson();

const extractGroup = (groupData) => {
  for (const item of groupData) {
    if (item?.type === "Group") {
      extractGroup(item?.objects);
    } else if (item?.type !== "Group") {
      console.log(item);
      if (item?.params) {
        res.push(item?.params[0]?.name);
      }
    }
  }
};

const getVariables = (data) => {

  data.scenes[0].layers.forEach((el) => {
    if (el.type !== "Group" && el.params) {
      res.push(el.params[0]?.name);
    } else if (el.type === "Group") {
      extractGroup(el.objects);
    }
  });
  return res;
};
