export default function() {
  return [
    {
      title: "Users Overview",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">group</i>',
      htmlAfter: ""
    },
    {
      title: "New Reflection",
      htmlBefore: '<i class="material-icons">edit</i>',
      to: "/reflections",
    },
    {
      title: "Add New Content",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/addContent",
    },
    {
      title: "Roles",
      to: "/roles",
      htmlBefore: '<i class="material-icons">group</i>',
      htmlAfter: ""
    },
    {
      title: "Permissions",
      to: "/permissions",
      htmlBefore: '<i class="material-icons">check</i>',
      htmlAfter: ""
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/profile",
    }
  ];
}
