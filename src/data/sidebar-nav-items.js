export default function() {
  let user = JSON.parse(localStorage.getItem("user"));
  let userRole = user ? parseInt(user.role.id) : 0;
  if (userRole === 75) {
    return [
      {
        title: "Dashboard",
        htmlBefore: '<i class="material-icons">bar_chart</i>',
        to: "/dashboard",
        subMenu: ""
      },

      {
        title: "Profile",
        htmlBefore: '<i class="material-icons">account_circle</i>',
        to: "/profile",
        subMenu: ""
      },

      {
        title: "Manage Users",
        to: "#",
        htmlBefore: '<i class="material-icons">group</i>',
        htmlAfter: '<i class="fas fa-caret-down"></i>',
        subMenu: [
          {
            title: "All users",
            htmlBefore: '<i class="material-icons">group</i>',
            to: "/users/all"
          },
          {
            title: "Vendors",
            htmlBefore: '<i class="material-icons">add_shopping_cart</i>',
            to: "/users/vendors"
          },
          {
            title: "Subscribers",
            htmlBefore: '<i class="material-icons">phone_android</i>',
            to: "/users/subscribers"
          },
          {
            title: "Coaches",
            htmlBefore: '<i class="material-icons">emoji_people</i>',
            to: "/users/coaches"
          },
          {
            title: "Admins",
            htmlBefore: '<i class="material-icons">how_to_reg</i>',
            to: "/users/admins"
          },
          {
            title: "User Role",
            htmlBefore: '<i class="material-icons">person</i>',
            to: "/roles"
          },
          {
            title: "User Permissions",
            htmlBefore: '<i class="material-icons">vpn_key</i>',
            to: "/permissions"
          }
        ]
      },

      {
        title: "Daily Reflections",
        htmlBefore: '<i class="material-icons">edit</i>',
        htmlAfter: '<i class="fas fa-caret-down"></i>',
        to: "",
        subMenu: [
          {
            title: "View reflections",
            htmlBefore: '<i class="material-icons">subscriptions</i>',
            to: "/reflections/view"
          },
          {
            title: "Add reflections",
            htmlBefore: '<i class="material-icons">edit</i>',
            to: "/reflections/add"
          }
        ]
      },

      {
        title: "Products",
        to: "#",
        htmlBefore: '<i class="material-icons">shopping_cart</i>',
        htmlAfter: '<i class="fas fa-caret-down"></i>',
        subMenu: [
          {
            title: "All products",
            htmlBefore: '<i class="material-icons">shopping_cart</i>',
            to: "/products/allProducts   "
          },
          {
            title: "Videos",
            htmlBefore: '<i class="material-icons">theaters</i>',
            to: "/products/videos"
          },
          {
            title: "Audios",
            htmlBefore: '<i class="material-icons">audiotrack</i>',
            to: "/products/audios"
          },
          {
            title: "Ebooks",
            htmlBefore: '<i class="material-icons">book</i>',
            to: "/products/ebooks"
          },
          {
            title: "Authors",
            htmlBefore: '<i class="material-icons">person</i>',
            to: "/products/authors"
          },
          {
            title: "Add Product",
            htmlBefore: '<i class="material-icons">add_box</i>',
            to: "/products/addMedia"
          },

          {
            title: "Add Content",
            htmlBefore: '<i class="material-icons">add_box</i>',
            to: "/products/addContent"
          },
          {
            title: "Category",
            htmlBefore: '<i class="material-icons">list_alt</i>',
            to: "/products/Category"
          },
          {
            title: "Subscription settings",
            htmlBefore: '<i class="material-icons">video_library</i>',
            to: "/products/subscriptions"
          }
        ]
      },

      {
        title: "Chats",
        to: "#",
        htmlBefore: '<i class="material-icons">chat</i>',
        htmlAfter: '<i class="fas fa-caret-down"></i>',
        subMenu: [
          {
            title: "All chats",
            htmlBefore: '<i class="material-icons">person</i>',
            to: "/chats/allChats"
          }
          // {
          //   title: "Compose",
          //   htmlBefore: '<i class="material-icons">person</i>',
          //   to: "#",
          // },
          // {
          //   title: "Inbox",
          //   htmlBefore: '<i class="material-icons">person</i>',
          //   to: "#",
          // },
          // {
          //   title: "Coach Settings",
          //   htmlBefore: '<i class="material-icons">person</i>',
          //   to: "#",
          // }
        ]
      },

      {
        title: "Accounts",
        to: "#",
        htmlBefore: '<i class="material-icons">group</i>',
        htmlAfter: '<i class="fas fa-caret-down"></i>',
        subMenu: [
          {
            title: "Downloads",
            htmlBefore: '<i class="material-icons">person</i>',
            to: "/accounts/downloads"
          },
          {
            title: "Purchase",
            htmlBefore: '<i class="material-icons">person</i>',
            to: "/accounts/purchase"
          },
          {
            title: "Invite",
            htmlBefore: '<i class="material-icons">person</i>',
            to: "/accounts/invite"
          }
        ]
      }
    ];
  }
  if (userRole === 99) {
    return [
      {
        title: "Products",
        to: "#",
        htmlBefore: '<i class="material-icons">shopping_cart</i>',
        htmlAfter: '<i class="fas fa-caret-down"></i>',
        subMenu: [
          {
            title: "All products",
            htmlBefore: '<i class="material-icons">shopping_cart</i>',
            to: "/products/allProducts"
          },
          {
            title: "Videos",
            htmlBefore: '<i class="material-icons">theaters</i>',
            to: "/products/videos"
          },
          {
            title: "Audios",
            htmlBefore: '<i class="material-icons">audiotrack</i>',
            to: "/products/audios"
          },
          {
            title: "Ebooks",
            htmlBefore: '<i class="material-icons">book</i>',
            to: "/products/ebooks"
          },

          {
            title: "Add Product",
            htmlBefore: '<i class="material-icons">add_box</i>',
            to: "/products/addMedia"
          },

          {
            title: "Add Content",
            htmlBefore: '<i class="material-icons">add_box</i>',
            to: "/products/addContent"
          }
        ]
      },

      {
        title: "Posts",
        to: "#",
        htmlBefore: '<i class="material-icons">assignment</i>',
        htmlAfter: '<i class="fas fa-caret-down"></i>',
        subMenu: [
          {
            title: "All post",
            htmlBefore: '<i class="material-icons">assignment</i>',
            to: "/posts/all"
          },
          {
            title: "New post",
            htmlBefore: '<i class="material-icons">create</i>',
            to: "/posts/new"
          }
        ]
      },

      {
        title: "Profile",
        htmlBefore: '<i class="material-icons">account_circle</i>',
        to: "/profile",
        subMenu: ""
      }
    ];
  }
}
