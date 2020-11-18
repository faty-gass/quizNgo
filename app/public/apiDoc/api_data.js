define({ "api": [
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Login",
    "name": "Login",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password with 6 char min..</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>JWT token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"access_token\": \"xxxxxxxxxxxxxxxxxxxxx\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized.",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Incorrect credentials\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app.controller.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/profile",
    "title": "Get authentified user",
    "name": "getAuth",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User info.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"id\" : \"5f845e9c3637511f9875b63f\",\n  \"name\": \"John\",\n  \"email\": \"john@john.com\",\n  \"favorites\" : [\"5f7f00e8c828e01d223fd058\", \"5f7f4c46eb4a5b3d2eaa1e34\"],\n  \"score\" : 30,\n  \"role\": \"user\"\n},",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized.",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Incorrect credentials\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app.controller.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/category",
    "title": "Create new category",
    "name": "CreateCategory",
    "group": "Category",
    "description": "<p>Creating a new category</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the new category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the created category</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error while creating new entry.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/category/category.controller.ts",
    "groupTitle": "Category"
  },
  {
    "type": "delete",
    "url": "/category/:id",
    "title": "Delete category",
    "name": "DeleteCategory",
    "group": "Category",
    "description": "<p>Deleting an existing category</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the category</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n   {\n      \"message\": \"Category successfully deleted\",\n   },",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFoundError",
            "description": "<p>Category not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/category/category.controller.ts",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/category",
    "title": "Get all categories",
    "name": "GetCategories",
    "group": "Category",
    "description": "<p>Showing all the categories</p>",
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": " HTTP/1.1 200 OK\n[\n    {\n       \"id\": \"5f7efd7fc828e01d223fd055\",\n       \"name\" : \"Laravel\"\n    },\n    {\n       \"id\": \"5f7efd87c828e01d223fd056\",\n       \"name\" : \"PHP\"\n    },\n    ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/category/category.controller.ts",
    "groupTitle": "Category"
  },
  {
    "type": "patch",
    "url": "/category/:id",
    "title": "Update category",
    "name": "UpdateCategory",
    "group": "Category",
    "description": "<p>Updating an existing category</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>New name of a category</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n   {\n      \"id\": \"5f7efd7fc828e01d223fd055\",\n      \"name\" : \"Laravel\"\n   },",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFoundError",
            "description": "<p>Category not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/category/category.controller.ts",
    "groupTitle": "Category"
  },
  {
    "type": "post",
    "url": "/comments",
    "title": "Add a comment",
    "name": "CreateComment",
    "group": "Comments",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID of the user posting the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quizz_id",
            "description": "<p>ID of the quiz where the comment was added.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Content of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the created comment.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quizz_id",
            "description": "<p>ID of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Contenet of the comment.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"id\": \"5f85cdb33bee723d0ae5a1d4\",\n  \"user_id\": \"5f845e9c3637511f9875b34f\",\n  \"quizz_id\": \"5f7f00e8c828e01d223fd058\",\n  \"comment\": \"First comment quiz laravel\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServorError",
            "description": "<p>Database error while creating new entry.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/comment/comment.controller.ts",
    "groupTitle": "Comments"
  },
  {
    "type": "delete",
    "url": "/comments/:id",
    "title": "",
    "name": "DeleteComment",
    "group": "Comments",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the comment</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n   \"message\": \"\"Comment successfully deleted !\"\"\n  },",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFoundError",
            "description": "<p>Comment not Found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/comment/comment.controller.ts",
    "groupTitle": "Comments"
  },
  {
    "type": "get",
    "url": "/comments",
    "title": "Get all comments",
    "name": "GetComments",
    "group": "Comments",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n [\n   {\n    \"id\": \"5f85cdb33bee723d0ae5a1d4\",\n    \"user_id\": \"5f845e9c3637511f9875b34f\",\n    \"quizz_id\": \"5f7f00e8c828e01d223fd058\",\n    \"comment\": \"First comment quiz laravel\"\n   },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/comment/comment.controller.ts",
    "groupTitle": "Comments"
  },
  {
    "type": "get",
    "url": "/comments/quizz/:id",
    "title": "Get quiz comments",
    "name": "GetQuizComments",
    "group": "Comments",
    "description": "<p>Get all the comments for a specific quiz</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the quiz.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n [\n   {\n    \"id\": \"5f85cdb33bee723d0ae5a1d4\",\n    \"user_id\": \"5f845e9c3637511f9875b34f\",\n    \"quizz_id\": \"5f7f00e8c828e01d223fd058\",\n    \"comment\": \"First comment quiz laravel\"\n   },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/comment/comment.controller.ts",
    "groupTitle": "Comments"
  },
  {
    "type": "patch",
    "url": "/comments/:id",
    "title": "Update comment",
    "name": "UpdateComment",
    "group": "Comments",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the comment</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>New content of the comment</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n   \"message\": \"\"Comment successfully updated !\"\"\n  },",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/comment/comment.controller.ts",
    "groupTitle": "Comments"
  },
  {
    "type": "delete",
    "url": "/donequiz/:id",
    "title": "Delete one quiz done",
    "name": "DeleteDoneQuiz",
    "group": "DoneQuiz",
    "description": "<p>Delete a quiz already done.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the quiz done.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"DoneQuiz successfully deleted\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFoundError",
            "description": "<p>Quiz not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/donequiz/donequiz.controller.ts",
    "groupTitle": "DoneQuiz"
  },
  {
    "type": "get",
    "url": "/donequiz",
    "title": "Show all done quiz",
    "name": "GetAllDoneQuiz",
    "group": "DoneQuiz",
    "description": "<p>Showing all the quiz already done.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": \"5f843ce9de4ad118bcbf8135\",\n    \"quizz_id\": \"5f7f3dac7a1445090cc23e75\",\n    \"user_id\" : \"5f7d8f5aef1ca604b56f8ca5\",\n    \"score\" : 60,\n    \"success_rate\": 50,\n  },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServorError.",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/donequiz/donequiz.controller.ts",
    "groupTitle": "DoneQuiz"
  },
  {
    "type": "get",
    "url": "/donequiz/user/:id",
    "title": "Show user done quiz",
    "name": "GetUserDoneQuiz",
    "group": "DoneQuiz",
    "description": "<p>Showing all the quiz already done by a given user.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": \"5f843ce9de4ad118bcbf8135\",\n    \"quizz_id\": {\n       \"id\": \"5f7f3dac7a1445090cc23e75\",\n       \"avg_rating\": 4.666666666666667,\n       \"is_published\": true,\n       \"name\": \"Nico Facile 2\",\n       \"category\": {\n           \"id\": \"5f7efda4c828e01d223fd057\",\n           \"name\": \"Javascript\"\n        }\n       \"difficulty\": \"Facile\",\n       \"bonus_time\": 10,\n       \"bonus_xp\": 100,\n       \"createdAt\": \"2020-10-08T16:26:20.517Z\",\n       \"updatedAt\": \"2020-10-19T08:08:32.179Z\"\n     },\n    \"user_id\" : \"5f7d8f5aef1ca604b56f8ca5\",\n    \"score\" : 60,\n    \"success_rate\": 50,\n  },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServorError.",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/donequiz/donequiz.controller.ts",
    "groupTitle": "DoneQuiz"
  },
  {
    "type": "get",
    "url": "/donequiz/rank/:id",
    "title": "Show user rank",
    "name": "GetUserRank",
    "group": "DoneQuiz",
    "description": "<p>Showing the score rank of a given user.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rank",
            "description": "<p>Rank of the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    \"user_id\": \"5f845e9c3637511f9875b34f\",\n    \"rank\": 3\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServorError",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/donequiz/donequiz.controller.ts",
    "groupTitle": "DoneQuiz"
  },
  {
    "type": "post",
    "url": "/donequiz",
    "title": "Saving quiz result",
    "name": "SaveQuiz",
    "group": "DoneQuiz",
    "description": "<p>Saving the result of a quiz done by one user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quizz_id",
            "description": "<p>ID of the quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Total xps won in the quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "success_rate",
            "description": "<p>Percentage of good answers.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the finished quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quizz_id",
            "description": "<p>ID of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Total xps won by the user in the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "success_rate",
            "description": "<p>Percentage of good answers.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"id\": \"5f843ce9de4ad118bcbf8135\",\n  \"quizz_id\": \"5f7f3dac7a1445090cc23e75\",\n  \"user_id\" : \"5f7d8f5aef1ca604b56f8ca5\",\n  \"score\" : 60,\n  \"success_rate\": 50,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServorError",
            "description": "<p>Database error while creating new entry.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/donequiz/donequiz.controller.ts",
    "groupTitle": "DoneQuiz"
  },
  {
    "type": "patch",
    "url": "/donequiz/:id",
    "title": "Update one quiz done",
    "name": "UpdateDoneQuiz",
    "group": "DoneQuiz",
    "description": "<p>Update a quiz already done.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the quiz done.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>New total of xps won.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "success_rate",
            "description": "<p>New percentage of good answers.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"DoneQuiz successfully updated\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFoundError",
            "description": "<p>Quiz not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/donequiz/donequiz.controller.ts",
    "groupTitle": "DoneQuiz"
  },
  {
    "type": "post",
    "url": "/question/one",
    "title": "Create new question",
    "name": "CreateNewQuestion",
    "group": "Question",
    "description": "<p>Adding one question to a specific quiz.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quizz_id",
            "description": "<p>ID of the quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "xps",
            "description": "<p>Number of points to win.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "question",
            "description": "<p>Title of the question.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "answers",
            "description": "<p>List of answer objects with an 'answer' string property for the content and a 'is_correct' boolean property that indicates the right answer.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the created question.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"id\": \"5f864813a6658f0cf8c6fc5b\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServorError",
            "description": "<p>Database error while creating new entry.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/question/question.controller.ts",
    "groupTitle": "Question"
  },
  {
    "type": "post",
    "url": "/question",
    "title": "Create new questions",
    "name": "CreateNewQuestions",
    "group": "Question",
    "description": "<p>Adding multiple questions to one quiz at once</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "questions",
            "description": "<p>Array of question objects with properties quizz_id, xps, question, answers.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>ID of the created question.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"3 question(s) added\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServorError",
            "description": "<p>Database error while creating new entry.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/question/question.controller.ts",
    "groupTitle": "Question"
  },
  {
    "type": "delete",
    "url": "/question/:id",
    "title": "Delete questions",
    "name": "DeleteQuestion",
    "group": "Question",
    "permission": [
      {
        "name": "admin"
      },
      {
        "name": "admin"
      }
    ],
    "description": "<p>Delete all the questions from a given quiz</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the quiz.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Questions successfully deleted\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError.",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/question/question.controller.ts",
    "groupTitle": "Question"
  },
  {
    "type": "get",
    "url": "/question/:id",
    "title": "Get quiz questions",
    "name": "GetOneQuizQuestions",
    "group": "Question",
    "description": "<p>Get all the questions from a given quiz without the correct answers.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the quiz.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n [\n    {\n       \"id\": \"5f864813a6658f0cf8c6fc5b\",\n       \"quizz_id\": \"5f7f4c46eb4a5b3d2eaa1e34\",\n       \"xps\": 10,\n       \"question\": \"Naxst JS est une techno pas encore inventée?\",\n       \"is_multi\": true,\n       \"answers\":  [\n          {\n            \"answer\": \"Oui\",\n          }, \n          {\n            \"answer\": \"Non\",\n          }, \n          {\n            \"answer\": \"Osef\",\n          }\n        ],\n     },\n   ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServorError",
            "description": "<p>.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/question/question.controller.ts",
    "groupTitle": "Question"
  },
  {
    "type": "get",
    "url": "/question/:id/admin",
    "title": "Get quiz question(admin)",
    "name": "GetOneQuizQuestionsAdmin",
    "group": "Question",
    "description": "<p>Get all the questions from a given quiz with the correct answers.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the quiz.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n [\n    {\n       \"id\": \"5f864813a6658f0cf8c6fc5b\",\n       \"quizz_id\": \"5f7f4c46eb4a5b3d2eaa1e34\",\n       \"xps\": 10,\n       \"question\": \"Naxst JS est une techno pas encore inventée?\",\n       \"answers\":  [\n          {\n            \"answer\": \"Oui\",\n            \"is_correct\": true\n          },\n          {\n            \"answer\": \"Non\",\n            \"is_correct\": false\n          },\n          {\n            \"answer\": \"Osef\",\n            \"is_correct\": true\n          }\n        ],\n     },\n   ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServorError",
            "description": "<p>.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/question/question.controller.ts",
    "groupTitle": "Question"
  },
  {
    "type": "patch",
    "url": "/question/:id",
    "title": "Update questions",
    "name": "UpdateQuestion",
    "group": "Question",
    "permission": [
      {
        "name": "admin"
      },
      {
        "name": "admin"
      }
    ],
    "description": "<p>Update multiple questions from one quiz at once.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "question",
            "description": "<p>Array of question objects with properties id, quizz_id, xps, question, answers.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"6 question(s) updated !\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFoundError.",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Question not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/question/question.controller.ts",
    "groupTitle": "Question"
  },
  {
    "type": "post",
    "url": "/question/:id/result",
    "title": "Check results",
    "name": "VerifyResults",
    "group": "Question",
    "description": "<p>Check one user answers after they took the quiz.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array[]",
            "optional": false,
            "field": "answers",
            "description": "<p>Array containing one array per question with the index of the user's answer.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "timeout",
            "description": "<p>True if the user answered the quiz within the bonus time limit.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID of the user who took the quiz.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "results",
            "description": "<p>Array containing a result object for each answer with properties index, is_good_answer, good_answers, user_answers, xps.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Total xps won in the quiz .</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "success_rate",
            "description": "<p>Percentage of good answers.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \n    [\n      {\n        \"index\": 0,\n        \"is_good_answer\": true,\n        \"good_answers\": [0,2],\n        \"user_answers\": [0,2],\n        \"xps\": 10,\n      },\n      ...\n    ],\n  \"score\" : 150,\n  \"success_rate\" : 66,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServorError.",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/question/question.controller.ts",
    "groupTitle": "Question"
  },
  {
    "type": "get",
    "url": "/quizz/suggest/:id",
    "title": "Suggest a quiz",
    "name": "QuizSuggestion",
    "group": "Quizz",
    "description": "<p>Suggest a quiz to a given user according to the quizz they didn't do yet</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Id &amp; Name of the quiz's category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty level of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "avg_rating",
            "description": "<p>Average rating based on user's ratings</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_published",
            "description": "<p>TRUE : quiz is published, FALSE : quiz is NOT published</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "created_at",
            "description": "<p>Timestamp of the quiz's creation</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Timestamp of the quiz's last modification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n {\n       \"id\": \"5f7f3dac7a1445090cc23e75\",\n       \"name\": \"Nico Facile 2\",\n       \"category\": {\n           \"_id\": \"5f7efda4c828e01d223fd057\",\n           \"name\": \"Javascript\",\n           \"__v\": 0\n       },\n       \"difficulty\": \"Facile\",\n       \"bonus_time\": 10,\n       \"bonus_xp\": 100,\n       \"avg_rating\": 4.666666666666667,\n       \"is_published\": true,\n       \"created_at\": \"2020-10-08T16:26:20.517Z\",\n       \"updated_at\": \"2020-10-19T08:08:32.179Z\"\n     }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No Match Found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
  {
    "type": "post",
    "url": "/quizz",
    "title": "Create a new quiz",
    "name": "addQuizz",
    "group": "Quizz",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Quiz name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Id of the quiz category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"Facile\"",
              "\"Moyen\"",
              "\"Difficile\""
            ],
            "optional": false,
            "field": "difficulty",
            "description": "<p>Quiz difficulty level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "is_published",
            "defaultValue": "false",
            "description": "<p>Published status with default false</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the new quiz</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n    \"id\": \"5f8ee...382b7\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 XXX XXX\n{\n  \"XXX\": \"XXX\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
  {
    "type": "delete",
    "url": "/quizz/:id",
    "title": "Delete one quiz",
    "name": "deleteQuizz",
    "group": "Quizz",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Quiz unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Quiz successfully deleted&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n        \"message\": \" Quiz successfully deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 XXX XXX\n{\n  \"XXX\": \"XXX\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
  {
    "type": "get",
    "url": "/quizz/stats",
    "title": "Get all quizz stats",
    "name": "getAllQuizzWithStats",
    "group": "Quizz",
    "description": "<p>Get all quizz with playcount (unreliable) and success ratio additional stats</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Id &amp; Name of the quiz's category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty level of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "avg_rating",
            "description": "<p>Average rating based on user's ratings</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "playcount",
            "description": "<p>UNRELIABLE (playcount of the quiz, but doesn't considers unregisred users games nor registred users multiple games)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "success_ratio",
            "description": "<p>Average success ratio based on users results</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_published",
            "description": "<p>TRUE : quiz is published, FALSE : quiz is NOT published</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "created_at",
            "description": "<p>Timestamp of the quiz's creation</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Timestamp of the quiz's last modification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n       {\n           \"id\": \"5f7f4c46eb4a5b3d2eaa1e34\",\n           \"name\": \"Test avec 2 questions\",\n           \"category\": {\n               \"_id\": \"5f7f4bf1eb4a5b3d2eaa1e33\",\n               \"name\": \"Naxst JS\",\n               \"__v\": 0\n           },\n           \"difficulty\": \"Difficile\",\n           \"bonus_time\": 1,\n           \"bonus_xp\": 100,\n           \"avg_rating\": 3.3333333333333335,\n           \"playcount\": 6,\n           \"success_ratio\": 85,\n           \"is_published\": true,\n           \"created_at\": \"2020-10-09T14:07:17.769Z\",\n           \"updated_at\": \"2020-10-16T17:36:11.589Z\"\n       }\n     ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
  {
    "type": "post",
    "url": "/quizz/search",
    "title": "Search quiz",
    "name": "searchAll",
    "group": "Quizz",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Search",
            "description": "<p>string</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Id &amp; Name of the quiz's category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty level of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "avg_rating",
            "description": "<p>Average rating based on user's ratings</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_published",
            "description": "<p>TRUE : quiz is published, FALSE : quiz is NOT published</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "created_at",
            "description": "<p>Timestamp of the quiz's creation</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Timestamp of the quiz's last modification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n {\n         \"id\": \"5f7f3dac7a1445090cc23e75\",\n         \"name\": \"Nico Facile 2\",\n         \"category\": {\n             \"_id\": \"5f7efda4c828e01d223fd057\",\n             \"name\": \"Javascript\",\n             \"__v\": 0\n         },\n         \"difficulty\": \"Facile\",\n         \"bonus_time\": 10,\n         \"bonus_xp\": 100,\n         \"avg_rating\": 4.666666666666667,\n         \"is_published\": true,\n         \"created_at\": \"2020-10-08T16:26:20.517Z\",\n         \"updated_at\": \"2020-10-19T08:08:32.179Z\"\n       }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
  {
    "type": "get",
    "url": "/quizz",
    "title": "Get all quizz",
    "name": "showAllQuiz",
    "group": "Quizz",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Id &amp; Name of the quiz's category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty level of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "avg_rating",
            "description": "<p>Average rating based on user's ratings</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_published",
            "description": "<p>TRUE : quiz is published, FALSE : quiz is NOT published</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "created_at",
            "description": "<p>Timestamp of the quiz's creation</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Timestamp of the quiz's last modification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n       {\n           \"id\": \"5f872...aa9f4\",\n           \"name\": \"My Wonderful Quiz\",\n           \"category\": {\n               \"_id\": \"5f7f4...a1e33\",\n               \"name\": \"Naxst JS\",\n           },\n           \"difficulty\": \"Moyen\",\n           \"bonus_time\": 1,\n           \"bonus_xp\": 100,\n           \"avg_rating\": 4.333333333333333,\n           \"is_published\": true,\n           \"created_at\": \"2020-10-14T16:50:43.383Z\",\n           \"updated_at\": \"2020-10-18T16:40:35.623Z\"\n       }\n     ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
  {
    "type": "get",
    "url": "/quizz/:id",
    "title": "Get one quiz by Id",
    "name": "showOneQuizz",
    "group": "Quizz",
    "description": "<p>Get one quiz by Id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Quiz unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Id &amp; Name of the quiz's category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty level of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "avg_rating",
            "description": "<p>Average rating based on user's ratings</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_published",
            "description": "<p>TRUE : quiz is published, FALSE : quiz is NOT published</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "created_at",
            "description": "<p>Timestamp of the quiz's creation</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Timestamp of the quiz's last modification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n       {\n           \"id\": \"5f7f4c46eb4a5b3d2eaa1e34\",\n           \"name\": \"Test avec 2 questions\",\n           \"category\": {\n               \"_id\": \"5f7f4bf1eb4a5b3d2eaa1e33\",\n               \"name\": \"Naxst JS\",\n               \"__v\": 0\n           },\n           \"difficulty\": \"Difficile\",\n           \"bonus_time\": 1,\n           \"bonus_xp\": 100,\n           \"avg_rating\": 3.3333333333333335,\n           \"is_published\": true,\n           \"created_at\": \"2020-10-09T14:07:17.769Z\",\n           \"updated_at\": \"2020-10-16T17:36:11.589Z\"\n       }\n     ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
  {
    "type": "get",
    "url": "/quizz/published",
    "title": "Get all published quizz",
    "name": "showPublishedQuizz",
    "group": "Quizz",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Id &amp; Name of the quiz's category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty level of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "avg_rating",
            "description": "<p>Average rating based on user's ratings</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_published",
            "description": "<p>TRUE : quiz is published, FALSE : quiz is NOT published</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "created_at",
            "description": "<p>Timestamp of the quiz's creation</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Timestamp of the quiz's last modification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n       {\n           \"id\": \"5f872...aa9f4\",\n           \"name\": \"My Wonderful Quiz\",\n           \"category\": {\n               \"_id\": \"5f7f4...a1e33\",\n               \"name\": \"Naxst JS\",\n           },\n           \"difficulty\": \"Moyen\",\n           \"bonus_time\": 1,\n           \"bonus_xp\": 100,\n           \"avg_rating\": 4.333333333333333,\n           \"is_published\": true,\n           \"created_at\": \"2020-10-14T16:50:43.383Z\",\n           \"updated_at\": \"2020-10-18T16:40:35.623Z\"\n       }\n     ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
  {
    "type": "patch",
    "url": "/quizz/:id",
    "title": "Update an existing quiz",
    "name": "updateQuizz",
    "group": "Quizz",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Quiz unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Quiz name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "category",
            "description": "<p>Id of the quiz category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"Facile\"",
              "\"Moyen\"",
              "\"Difficile\""
            ],
            "optional": true,
            "field": "difficulty",
            "description": "<p>Quiz difficulty level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "is_published",
            "defaultValue": "false",
            "description": "<p>Published status with default false</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Quiz successfully updated&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n        \"message\": \" Quiz successfully updated\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 XXX XXX\n{\n  \"XXX\": \"XXX\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
  {
    "type": "post",
    "url": "/ratings",
    "title": "Create a new rating",
    "name": "addRating",
    "group": "Ratings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quizz_id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>Rating given by the user to the quiz</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "avg_rating",
            "description": "<p>Average rating of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_published",
            "description": "<p>Published status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Id of the quiz's category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Quiz's difficulty</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Timestamp of the quiz's creation</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Timestamp of the quiz's last modification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n         \"avg_rating\": 3.4,\n         \"is_published\": true,\n         \"_id\": \"5f7f4c46eb4a5b3d2eaa1e34\",\n         \"name\": \"Test avec 2 questions\",\n         \"category\": \"5f7f4bf1eb4a5b3d2eaa1e33\",\n         \"difficulty\": \"Difficile\",\n         \"bonus_time\": 1,\n         \"bonus_xp\": 888,\n         \"createdAt\": \"2020-10-09T14:07:17.769Z\",\n         \"updatedAt\": \"2020-10-20T17:26:49.037Z\"\n       }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"message\": \"Quiz was already rated !\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/rating/rating.controller.ts",
    "groupTitle": "Ratings"
  },
  {
    "type": "get",
    "url": "/ratings",
    "title": "Get all ratings",
    "name": "getAllRatings",
    "group": "Ratings",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id of the rating</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quizz_id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>Rating of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Timestamp of the rating's creation</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Timestamp of the rating's last modification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n         \"_id\": \"5f8745c82cb5147334e5e656\",\n         \"quizz_id\": \"5f7f4c46eb4a5b3d2eaa1e34\",\n         \"user_id\": \"5f85e5c90fd9ad51bb2b0c92\",\n         \"rating\": 5,\n         \"createdAt\": \"2020-10-14T18:39:04.551Z\",\n         \"updatedAt\": \"2020-10-14T18:39:04.551Z\",\n       }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/rating/rating.controller.ts",
    "groupTitle": "Ratings"
  },
  {
    "type": "post",
    "url": "/ratings/one",
    "title": "Get one user rating",
    "name": "getRating",
    "group": "Ratings",
    "description": "<p>Get one specific rating from one specific user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quizz_id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the rating</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>Rating of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Timestamp of the rating's creation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n   \"id\": \"5f8ffa34b3815d03d1d82bfb\",\n        \"rating\": 4,\n        \"created_at\": \"2020-10-21T09:07:00.489Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/rating/rating.controller.ts",
    "groupTitle": "Ratings"
  },
  {
    "type": "get",
    "url": "/ratings/:id",
    "title": "Get average ratings of a specific quiz",
    "name": "getavgRating",
    "group": "Ratings",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "avg_rating",
            "description": "<p>Average rating of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_published",
            "description": "<p>Published status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Id of the quiz's category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Quiz's difficulty</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Timestamp of the quiz's creation</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Timestamp of the quiz's last modification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n         \"avg_rating\": 3.4,\n         \"is_published\": true,\n         \"_id\": \"5f7f4c46eb4a5b3d2eaa1e34\",\n         \"name\": \"Test avec 2 questions\",\n         \"category\": \"5f7f4bf1eb4a5b3d2eaa1e33\",\n         \"difficulty\": \"Difficile\",\n         \"bonus_time\": 1,\n         \"bonus_xp\": 888,\n         \"createdAt\": \"2020-10-09T14:07:17.769Z\",\n         \"updatedAt\": \"2020-10-20T17:26:49.037Z\"\n       }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/rating/rating.controller.ts",
    "groupTitle": "Ratings"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create new user",
    "name": "CreateNewUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User unique name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User unique email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password with 6 char min..</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "favorites",
            "description": "<p>User favorite quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "score",
            "defaultValue": "0",
            "description": "<p>User total XPs.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"admin\"",
              "\"user\""
            ],
            "optional": true,
            "field": "role",
            "defaultValue": "user",
            "description": "<p>User status.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "favorites",
            "description": "<p>Favorites of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Score of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "role",
            "description": "<p>Status of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"id\" : \"5f845e9c3637511f9875b63f\"\n  \"name\": \"John\",\n  \"email\": \"john@john.com\",\n  \"favorites\" : [],\n  \"score\" : 0,\n  \"role\": \"user\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptableException.",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Not Acceptable\n{\n  \"error\": \"Email must be unique\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/users/users.controller.ts",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/users/admin/:id",
    "title": "Delete user",
    "name": "DeleteUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>UserNotFound</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/users/users.controller.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/admin",
    "title": "Get all registered users",
    "name": "GetAllUser",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n  \"id\" : \"5f845e9c3637511f9875b63f\",\n  \"name\": \"John\",\n  \"email\": \"john@john.com\",\n  \"favorites\" : [],\n  \"score\" : 30,\n  \"role\": \"user\"\n},\n{\n  \"id\" : \"5f845e9c3637511f9875b75f\",\n  \"name\": \"Jane\",\n  \"email\": \"jane@jane.com\",\n  \"favorites\" : [],\n  \"score\" : 60,\n  \"role\": \"admin\"\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"unauthorized\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/users/users.controller.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/admin/:id",
    "title": "Get one user info",
    "name": "GetOneUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n  \"id\" : \"5f845e9c3637511f9875b63f\",\n  \"name\": \"John\",\n  \"email\": \"john@john.com\",\n  \"favorites\" : [],\n  \"score\" : 30,\n  \"role\": \"user\"\n},",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Not Found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/users/users.controller.ts",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users/:id",
    "title": "Update user",
    "name": "UpdateUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>User unique email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>User password with 6 char min..</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "favorites",
            "description": "<p>User favorite quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "score",
            "defaultValue": "0",
            "description": "<p>User total XPs.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  message : \"User successfully updated !\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptableException.",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/users/users.controller.ts",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users/admin/:id",
    "title": "Update user (admin)",
    "name": "UpdateUserAdm",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>User unique email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>User password with 6 char min..</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "favorites",
            "description": "<p>User favorite quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "score",
            "defaultValue": "0",
            "description": "<p>User total XPs.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"admin\"",
              "\"user\""
            ],
            "optional": true,
            "field": "role",
            "defaultValue": "user",
            "description": "<p>User status.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptableException.",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/users/users.controller.ts",
    "groupTitle": "User"
  }
] });
