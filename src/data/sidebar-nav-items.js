export default function() {
  return [
    {
      title: "Users Overview",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "New Reflection",
      htmlBefore: '<i class="material-icons">add</i>',
      to: "/reflection",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/profile",
    }
  ];
}
