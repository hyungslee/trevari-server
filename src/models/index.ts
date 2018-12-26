export const getModels = async (user:{userId:number; name:string}) => {
  return new Promise((resolve, reject) => {
    resolve({
      name:user.name,
      message:'hi',
      id:user.userId,
    });
  });
};
