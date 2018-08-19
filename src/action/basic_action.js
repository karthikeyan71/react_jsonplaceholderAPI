
const selectUser = (data)=>{
  return {
      type: 'STORE_USER',
      payload:{
        id: data.id,
        user: data.name
      }
  }
};

export {selectUser};
