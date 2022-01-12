import AdminServices from 'src/services/schoolAdmin';

// eslint-disable-next-line import/no-mutable-exports
let classes = [];

AdminServices.getAllClasses()
  .then((response) => {
    classes = response;
  });

console.log(classes);
export default classes;
