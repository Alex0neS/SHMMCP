/**
 * СГЕНЕРИРОВАНО АВТОМАТИЧЕСКИ — не редактировать руками.
 * Источник: scripts/generate.ts + mcp/shm-mcp/spec/shm_admin_openapi.json, shm_user_openapi.json
 * Перегенерация: npm run generate
 */
import type { SpecVersionInfo, ToolDef } from "../types.js";

export const SPEC_VERSION: SpecVersionInfo = {
  "admin": {
    "title": "SHM API v1",
    "version": "2.15.0-a566ea7c9da89ba5cd0a5a456c966b118b9e8af7",
    "paths": 35,
    "operations": 81
  },
  "user": {
    "title": "SHM API v1",
    "version": "2.15.0-a566ea7c9da89ba5cd0a5a456c966b118b9e8af7",
    "paths": 39,
    "operations": 67
  }
};

export const TOOLS: ToolDef[] = [
  {
    "name": "admin_config_get",
    "method": "GET",
    "path": "/admin/config",
    "spec": "admin",
    "tag": "Конфигурация",
    "summary": "Прочитать весь конфиг",
    "description": "GET /admin/config\nПрочитать весь конфиг\nТег: Конфигурация\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        }
      }
    }
  },
  {
    "name": "admin_config_post",
    "method": "POST",
    "path": "/admin/config",
    "spec": "admin",
    "tag": "Конфигурация",
    "summary": "Изменить объект в конфиге",
    "description": "POST /admin/config\nИзменить объект в конфиге\nТег: Конфигурация\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "key": {
              "title": "ключ",
              "type": "string"
            },
            "value": {
              "title": "значение",
              "type": "object"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_config_put",
    "method": "PUT",
    "path": "/admin/config",
    "spec": "admin",
    "tag": "Конфигурация",
    "summary": "Создать объект в конфиге",
    "description": "PUT /admin/config\nСоздать объект в конфиге\nТег: Конфигурация\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "key": {
              "title": "ключ",
              "type": "string"
            },
            "value": {
              "title": "значение",
              "type": "object"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_config_delete",
    "method": "DELETE",
    "path": "/admin/config",
    "spec": "admin",
    "tag": "Конфигурация",
    "summary": "Удалить объект в конфиге",
    "description": "DELETE /admin/config\nУдалить объект в конфиге\nТег: Конфигурация\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string",
          "description": "ключ"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "key"
      ]
    }
  },
  {
    "name": "admin_config_by_key_get",
    "method": "GET",
    "path": "/admin/config/{key}",
    "spec": "admin",
    "tag": "Конфигурация",
    "summary": "Получить объект конфига",
    "description": "GET /admin/config/{key}\nПолучить объект конфига\nТег: Конфигурация\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string",
          "description": "ключ"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        }
      },
      "required": [
        "key"
      ]
    }
  },
  {
    "name": "admin_config_by_key_post",
    "method": "POST",
    "path": "/admin/config/{key}",
    "spec": "admin",
    "tag": "Конфигурация",
    "summary": "Изменить объект в конфиге",
    "description": "POST /admin/config/{key}\nИзменить объект в конфиге\nТег: Конфигурация\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string",
          "description": "ключ"
        },
        "body": {
          "properties": {
            "key": {
              "title": "ключ",
              "type": "string"
            },
            "value": {
              "title": "значение",
              "type": "object"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "key"
      ]
    }
  },
  {
    "name": "admin_config_by_key_delete",
    "method": "DELETE",
    "path": "/admin/config/{key}",
    "spec": "admin",
    "tag": "Конфигурация",
    "summary": "Удалить значение или объект внутри объекта конфига",
    "description": "DELETE /admin/config/{key}\nУдалить значение или объект внутри объекта конфига\nТег: Конфигурация\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string",
          "description": "ключ"
        },
        "value": {
          "type": "object",
          "description": "значение"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "key",
        "value"
      ]
    }
  },
  {
    "name": "admin_promo_get",
    "method": "GET",
    "path": "/admin/promo",
    "spec": "admin",
    "tag": "Промокоды",
    "summary": "Список промокодов",
    "description": "GET /admin/promo\nСписок промокодов\nТег: Промокоды\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "number",
          "description": "id пользователя кто создал"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        }
      }
    }
  },
  {
    "name": "admin_promo_post",
    "method": "POST",
    "path": "/admin/promo",
    "spec": "admin",
    "tag": "Промокоды",
    "summary": "Изменить промокод",
    "description": "POST /admin/promo\nИзменить промокод\nТег: Промокоды\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "created": {
              "format": "date",
              "title": "дата создания"
            },
            "expire": {
              "format": "date",
              "title": "дата истечения"
            },
            "id": {
              "title": "id промокода",
              "type": "string"
            },
            "settings": {
              "type": "object"
            },
            "template_id": {
              "title": "id шаблона",
              "type": "string"
            },
            "used": {
              "format": "date",
              "title": "дата использования"
            },
            "used_by": {
              "title": "id пользователя кто использовал промокод",
              "type": "number"
            },
            "user_id": {
              "title": "id пользователя кто создал",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_promo_put",
    "method": "PUT",
    "path": "/admin/promo",
    "spec": "admin",
    "tag": "Промокоды",
    "summary": "Генерация промокодов",
    "description": "PUT /admin/promo\nГенерация промокодов\nТег: Промокоды\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "created": {
              "format": "date",
              "title": "дата создания"
            },
            "expire": {
              "format": "date",
              "title": "дата истечения"
            },
            "id": {
              "title": "id промокода",
              "type": "string"
            },
            "settings": {
              "type": "object"
            },
            "template_id": {
              "title": "id шаблона",
              "type": "string"
            },
            "used": {
              "format": "date",
              "title": "дата использования"
            },
            "used_by": {
              "title": "id пользователя кто использовал промокод",
              "type": "number"
            },
            "user_id": {
              "title": "id пользователя кто создал",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_promo_delete",
    "method": "DELETE",
    "path": "/admin/promo",
    "spec": "admin",
    "tag": "Промокоды",
    "summary": "Удалить промокод",
    "description": "DELETE /admin/promo\nУдалить промокод\nТег: Промокоды\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "id промокода"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "admin_server_get",
    "method": "GET",
    "path": "/admin/server",
    "spec": "admin",
    "tag": "Сервера",
    "summary": "Получить список серверов",
    "description": "GET /admin/server\nПолучить список серверов\nТег: Сервера\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        }
      }
    }
  },
  {
    "name": "admin_server_post",
    "method": "POST",
    "path": "/admin/server",
    "spec": "admin",
    "tag": "Сервера",
    "summary": "Изменить сервер",
    "description": "POST /admin/server\nИзменить сервер\nТег: Сервера\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "enabled": {
              "description": "0 - выключен, 1 - включен",
              "enum": [
                0,
                1
              ],
              "title": "флаг включенного сервера",
              "type": "number"
            },
            "fail_count": {
              "title": "не используется",
              "type": "number"
            },
            "host": {
              "title": "адрес сервера",
              "type": "string"
            },
            "ip": {
              "title": "ip сервера",
              "type": "string"
            },
            "name": {
              "title": "имя сервера",
              "type": "string"
            },
            "server_gid": {
              "title": "id группы",
              "type": "number"
            },
            "server_id": {
              "title": "id сервера",
              "type": "number"
            },
            "services_count": {
              "title": "кол-во услуг на сервере",
              "type": "number"
            },
            "settings": {
              "type": "object"
            },
            "success_count": {
              "title": "не используется",
              "type": "number"
            },
            "transport": {
              "enum": [
                "ssh",
                "http",
                "telegram",
                "mail",
                "local"
              ],
              "title": "транспорт",
              "type": "string"
            },
            "weight": {
              "description": "чем больше вес, тем выше вероятность выборки",
              "title": "вес сервера для выборки",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_server_put",
    "method": "PUT",
    "path": "/admin/server",
    "spec": "admin",
    "tag": "Сервера",
    "summary": "Создать сервер",
    "description": "PUT /admin/server\nСоздать сервер\nТег: Сервера\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "enabled": {
              "description": "0 - выключен, 1 - включен",
              "enum": [
                0,
                1
              ],
              "title": "флаг включенного сервера",
              "type": "number"
            },
            "fail_count": {
              "title": "не используется",
              "type": "number"
            },
            "host": {
              "title": "адрес сервера",
              "type": "string"
            },
            "ip": {
              "title": "ip сервера",
              "type": "string"
            },
            "name": {
              "title": "имя сервера",
              "type": "string"
            },
            "server_gid": {
              "title": "id группы",
              "type": "number"
            },
            "server_id": {
              "title": "id сервера",
              "type": "number"
            },
            "services_count": {
              "title": "кол-во услуг на сервере",
              "type": "number"
            },
            "settings": {
              "type": "object"
            },
            "success_count": {
              "title": "не используется",
              "type": "number"
            },
            "transport": {
              "enum": [
                "ssh",
                "http",
                "telegram",
                "mail",
                "local"
              ],
              "title": "транспорт",
              "type": "string"
            },
            "weight": {
              "description": "чем больше вес, тем выше вероятность выборки",
              "title": "вес сервера для выборки",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_server_delete",
    "method": "DELETE",
    "path": "/admin/server",
    "spec": "admin",
    "tag": "Сервера",
    "summary": "Удалить сервер",
    "description": "DELETE /admin/server\nУдалить сервер\nТег: Сервера\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "server_id": {
          "type": "number",
          "description": "id сервера"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "server_id"
      ]
    }
  },
  {
    "name": "admin_server_group_get",
    "method": "GET",
    "path": "/admin/server/group",
    "spec": "admin",
    "tag": "Группы серверов",
    "summary": "Получить список групп серверов",
    "description": "GET /admin/server/group\nПолучить список групп серверов\nТег: Группы серверов\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        }
      }
    }
  },
  {
    "name": "admin_server_group_post",
    "method": "POST",
    "path": "/admin/server/group",
    "spec": "admin",
    "tag": "Группы серверов",
    "summary": "Изменить группу серверов",
    "description": "POST /admin/server/group\nИзменить группу серверов\nТег: Группы серверов\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "group_id": {
              "title": "id группы",
              "type": "number"
            },
            "name": {
              "title": "произвольное название группы",
              "type": "string"
            },
            "settings": {
              "type": "string"
            },
            "transport": {
              "default": "ssh",
              "enum": [
                "ssh",
                "http",
                "telegram",
                "mail",
                "local"
              ],
              "title": "транспорт",
              "type": "string"
            },
            "type": {
              "default": "random",
              "enum": [
                "random",
                "by-one",
                "evenly"
              ],
              "title": "способ выборки сервера",
              "type": "string"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_server_group_put",
    "method": "PUT",
    "path": "/admin/server/group",
    "spec": "admin",
    "tag": "Группы серверов",
    "summary": "Создать группу серверов",
    "description": "PUT /admin/server/group\nСоздать группу серверов\nТег: Группы серверов\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "group_id": {
              "title": "id группы",
              "type": "number"
            },
            "name": {
              "title": "произвольное название группы",
              "type": "string"
            },
            "settings": {
              "type": "string"
            },
            "transport": {
              "default": "ssh",
              "enum": [
                "ssh",
                "http",
                "telegram",
                "mail",
                "local"
              ],
              "title": "транспорт",
              "type": "string"
            },
            "type": {
              "default": "random",
              "enum": [
                "random",
                "by-one",
                "evenly"
              ],
              "title": "способ выборки сервера",
              "type": "string"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_server_group_delete",
    "method": "DELETE",
    "path": "/admin/server/group",
    "spec": "admin",
    "tag": "Группы серверов",
    "summary": "Удалить группу серверов",
    "description": "DELETE /admin/server/group\nУдалить группу серверов\nТег: Группы серверов\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "number",
          "description": "id группы"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "admin_server_identity_get",
    "method": "GET",
    "path": "/admin/server/identity",
    "spec": "admin",
    "tag": "Ключи SSH",
    "summary": "Список SSH ключей",
    "description": "GET /admin/server/identity\nСписок SSH ключей\nТег: Ключи SSH\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        }
      }
    }
  },
  {
    "name": "admin_server_identity_post",
    "method": "POST",
    "path": "/admin/server/identity",
    "spec": "admin",
    "tag": "Ключи SSH",
    "summary": "Изменить SSH ключ",
    "description": "POST /admin/server/identity\nИзменить SSH ключ\nТег: Ключи SSH\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "fingerprint": {
              "title": "отпечаток ключа",
              "type": "string"
            },
            "id": {
              "title": "id ключа",
              "type": "number"
            },
            "name": {
              "title": "имя ключа",
              "type": "string"
            },
            "private_key": {
              "title": "приватный ключ",
              "type": "string"
            },
            "public_key": {
              "title": "публичный ключ",
              "type": "string"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_server_identity_put",
    "method": "PUT",
    "path": "/admin/server/identity",
    "spec": "admin",
    "tag": "Ключи SSH",
    "summary": "Сохранить новый SSH ключ",
    "description": "PUT /admin/server/identity\nСохранить новый SSH ключ\nТег: Ключи SSH\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "fingerprint": {
              "title": "отпечаток ключа",
              "type": "string"
            },
            "id": {
              "title": "id ключа",
              "type": "number"
            },
            "name": {
              "title": "имя ключа",
              "type": "string"
            },
            "private_key": {
              "title": "приватный ключ",
              "type": "string"
            },
            "public_key": {
              "title": "публичный ключ",
              "type": "string"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_server_identity_delete",
    "method": "DELETE",
    "path": "/admin/server/identity",
    "spec": "admin",
    "tag": "Ключи SSH",
    "summary": "Удалить SSH ключ",
    "description": "DELETE /admin/server/identity\nУдалить SSH ключ\nТег: Ключи SSH\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number",
          "description": "id ключа"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "admin_server_identity_generate_get",
    "method": "GET",
    "path": "/admin/server/identity/generate",
    "spec": "admin",
    "tag": "Ключи SSH",
    "summary": "Сгенерировать SSH ключи",
    "description": "GET /admin/server/identity/generate\nСгенерировать SSH ключи\nТег: Ключи SSH\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        }
      }
    }
  },
  {
    "name": "admin_service_get",
    "method": "GET",
    "path": "/admin/service",
    "spec": "admin",
    "tag": "Услуги",
    "summary": "Получить услугу",
    "description": "GET /admin/service\nПолучить услугу\nТег: Услуги\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        }
      }
    }
  },
  {
    "name": "admin_service_post",
    "method": "POST",
    "path": "/admin/service",
    "spec": "admin",
    "tag": "Услуги",
    "summary": "Изменить услугу",
    "description": "POST /admin/service\nИзменить услугу\nТег: Услуги\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "allow_to_order": {
              "default": 0,
              "enum": [
                0,
                1
              ],
              "title": "флаг разрешения регистрации",
              "type": "number"
            },
            "category": {
              "title": "категория",
              "type": "string"
            },
            "children": {
              "title": "дочерние услуги",
              "type": "object"
            },
            "config": {
              "title": "конфиг",
              "type": "object"
            },
            "cost": {
              "title": "стоимость",
              "type": "number"
            },
            "deleted": {
              "default": 0,
              "enum": [
                0,
                1
              ],
              "title": "флаг удаленной услуги",
              "type": "number"
            },
            "descr": {
              "title": "описание",
              "type": "string"
            },
            "is_composite": {
              "default": 0,
              "enum": [
                0,
                1
              ],
              "title": "флаг составной услуги",
              "type": "number"
            },
            "max_count": {
              "title": "не используется",
              "type": "number"
            },
            "name": {
              "title": "название услуги",
              "type": "string"
            },
            "next": {
              "title": "id сделующей услуги",
              "type": "number"
            },
            "no_discount": {
              "default": 0,
              "enum": [
                0,
                1
              ],
              "title": "флаг неприменяемости скидок",
              "type": "number"
            },
            "pay_always": {
              "default": 0,
              "description": "1 - платная всегда, даже в качестве дочерней",
              "enum": [
                0,
                1
              ],
              "title": "флаг платности",
              "type": "number"
            },
            "pay_in_credit": {
              "default": 0,
              "enum": [
                0,
                1
              ],
              "title": "флаг разрешения списания в минус",
              "type": "number"
            },
            "period": {
              "default": 1,
              "title": "период",
              "type": "number"
            },
            "question": {
              "title": "не используется",
              "type": "number"
            },
            "service_id": {
              "title": "id услуги",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_service_put",
    "method": "PUT",
    "path": "/admin/service",
    "spec": "admin",
    "tag": "Услуги",
    "summary": "Создать услугу",
    "description": "PUT /admin/service\nСоздать услугу\nТег: Услуги\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "allow_to_order": {
              "default": 0,
              "enum": [
                0,
                1
              ],
              "title": "флаг разрешения регистрации",
              "type": "number"
            },
            "category": {
              "title": "категория",
              "type": "string"
            },
            "children": {
              "title": "дочерние услуги",
              "type": "object"
            },
            "config": {
              "title": "конфиг",
              "type": "object"
            },
            "cost": {
              "title": "стоимость",
              "type": "number"
            },
            "deleted": {
              "default": 0,
              "enum": [
                0,
                1
              ],
              "title": "флаг удаленной услуги",
              "type": "number"
            },
            "descr": {
              "title": "описание",
              "type": "string"
            },
            "is_composite": {
              "default": 0,
              "enum": [
                0,
                1
              ],
              "title": "флаг составной услуги",
              "type": "number"
            },
            "max_count": {
              "title": "не используется",
              "type": "number"
            },
            "name": {
              "title": "название услуги",
              "type": "string"
            },
            "next": {
              "title": "id сделующей услуги",
              "type": "number"
            },
            "no_discount": {
              "default": 0,
              "enum": [
                0,
                1
              ],
              "title": "флаг неприменяемости скидок",
              "type": "number"
            },
            "pay_always": {
              "default": 0,
              "description": "1 - платная всегда, даже в качестве дочерней",
              "enum": [
                0,
                1
              ],
              "title": "флаг платности",
              "type": "number"
            },
            "pay_in_credit": {
              "default": 0,
              "enum": [
                0,
                1
              ],
              "title": "флаг разрешения списания в минус",
              "type": "number"
            },
            "period": {
              "default": 1,
              "title": "период",
              "type": "number"
            },
            "question": {
              "title": "не используется",
              "type": "number"
            },
            "service_id": {
              "title": "id услуги",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_service_delete",
    "method": "DELETE",
    "path": "/admin/service",
    "spec": "admin",
    "tag": "Услуги",
    "summary": "Удалить услугу",
    "description": "DELETE /admin/service\nУдалить услугу\nТег: Услуги\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "service_id": {
          "type": "number",
          "description": "id услуги"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "service_id"
      ]
    }
  },
  {
    "name": "admin_service_children_get",
    "method": "GET",
    "path": "/admin/service/children",
    "spec": "admin",
    "tag": "Услуги",
    "summary": "Список дочерних услуг",
    "description": "GET /admin/service/children\nСписок дочерних услуг\nТег: Услуги\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "service_id": {
          "type": "number",
          "description": "id услуги"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        }
      },
      "required": [
        "service_id"
      ]
    }
  },
  {
    "name": "admin_service_children_post",
    "method": "POST",
    "path": "/admin/service/children",
    "spec": "admin",
    "tag": "Услуги",
    "summary": "Изменить список дочерних услуг",
    "description": "POST /admin/service/children\nИзменить список дочерних услуг\nТег: Услуги\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "children": {
              "title": "дочерние услуги",
              "type": "object"
            },
            "service_id": {
              "title": "id услуги",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_service_event_get",
    "method": "GET",
    "path": "/admin/service/event",
    "spec": "admin",
    "tag": "События",
    "summary": "Список событий",
    "description": "GET /admin/service/event\nСписок событий\nТег: События\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        }
      }
    }
  },
  {
    "name": "admin_service_event_post",
    "method": "POST",
    "path": "/admin/service/event",
    "spec": "admin",
    "tag": "События",
    "summary": "Изменить событие",
    "description": "POST /admin/service/event\nИзменить событие\nТег: События\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "id": {
              "title": "id события",
              "type": "number"
            },
            "kind": {
              "default": "UserService",
              "title": "контроллер события",
              "type": "string"
            },
            "name": {
              "enum": [
                "CREATE",
                "BLOCK",
                "REMOVE",
                "PROLONGATE",
                "ACTIVATE",
                "NOT_ENOUGH_MONEY",
                "CHANGED",
                "CHANGED_TARIFF"
              ],
              "title": "событие",
              "type": "string"
            },
            "server_gid": {
              "default": 0,
              "title": "id группы серверов",
              "type": "number"
            },
            "settings": {
              "type": "object"
            },
            "title": {
              "title": "название события",
              "type": "string"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_service_event_put",
    "method": "PUT",
    "path": "/admin/service/event",
    "spec": "admin",
    "tag": "События",
    "summary": "Создать событие",
    "description": "PUT /admin/service/event\nСоздать событие\nТег: События\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "id": {
              "title": "id события",
              "type": "number"
            },
            "kind": {
              "default": "UserService",
              "title": "контроллер события",
              "type": "string"
            },
            "name": {
              "enum": [
                "CREATE",
                "BLOCK",
                "REMOVE",
                "PROLONGATE",
                "ACTIVATE",
                "NOT_ENOUGH_MONEY",
                "CHANGED",
                "CHANGED_TARIFF"
              ],
              "title": "событие",
              "type": "string"
            },
            "server_gid": {
              "default": 0,
              "title": "id группы серверов",
              "type": "number"
            },
            "settings": {
              "type": "object"
            },
            "title": {
              "title": "название события",
              "type": "string"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_service_event_delete",
    "method": "DELETE",
    "path": "/admin/service/event",
    "spec": "admin",
    "tag": "События",
    "summary": "Удалить событие",
    "description": "DELETE /admin/service/event\nУдалить событие\nТег: События\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number",
          "description": "id события"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "admin_service_order_get",
    "method": "GET",
    "path": "/admin/service/order",
    "spec": "admin",
    "tag": "Услуги",
    "summary": "Список услуг доступных для регистрации",
    "description": "GET /admin/service/order\nСписок услуг доступных для регистрации\nТег: Услуги\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        }
      }
    }
  },
  {
    "name": "admin_service_order_put",
    "method": "PUT",
    "path": "/admin/service/order",
    "spec": "admin",
    "tag": "Услуги",
    "summary": "Зарегистрировать услугу клиенту",
    "description": "PUT /admin/service/order\nЗарегистрировать услугу клиенту\nТег: Услуги\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "service_id": {
              "title": "id услуги",
              "type": "number"
            },
            "user_id": {
              "title": "id пользователя услуги",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_spool_get",
    "method": "GET",
    "path": "/admin/spool",
    "spec": "admin",
    "tag": "Задачи",
    "summary": "Список текущих задач",
    "description": "GET /admin/spool\nСписок текущих задач\nТег: Задачи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "number",
          "description": "id пользователя"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        }
      }
    }
  },
  {
    "name": "admin_spool_post",
    "method": "POST",
    "path": "/admin/spool",
    "spec": "admin",
    "tag": "Задачи",
    "summary": "Изменить задачу",
    "description": "POST /admin/spool\nИзменить задачу\nТег: Задачи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "created": {
              "format": "date",
              "readOnly": true,
              "title": "дата создания задачи"
            },
            "delayed": {
              "default": 0,
              "format": "date",
              "title": "время задержки выполнения в секундах"
            },
            "event": {
              "title": "событие в формате JSON",
              "type": "object"
            },
            "executed": {
              "format": "date",
              "readOnly": true,
              "title": "дата выполнения задачи"
            },
            "id": {
              "title": "id задачи",
              "type": "number"
            },
            "prio": {
              "default": 100,
              "description": "чем выше приоритет, тем раньше выполнится задача",
              "title": "приоритет команды",
              "type": "number"
            },
            "response": {
              "readOnly": true,
              "title": "результат выполнения задачи",
              "type": "object"
            },
            "settings": {
              "type": "object"
            },
            "status": {
              "default": "NEW",
              "enum": [
                "NEW",
                "SUCCESS",
                "FAIL",
                "DELAYED",
                "STUCK",
                "PAUSED"
              ],
              "title": "статус задачи",
              "type": "string"
            },
            "user_id": {
              "title": "id пользователя",
              "type": "number"
            },
            "user_service_id": {
              "title": "id услуги пользователя",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_spool_put",
    "method": "PUT",
    "path": "/admin/spool",
    "spec": "admin",
    "tag": "Задачи",
    "summary": "Создать задачу",
    "description": "PUT /admin/spool\nСоздать задачу\nТег: Задачи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "created": {
              "format": "date",
              "readOnly": true,
              "title": "дата создания задачи"
            },
            "delayed": {
              "default": 0,
              "format": "date",
              "title": "время задержки выполнения в секундах"
            },
            "event": {
              "title": "событие в формате JSON",
              "type": "object"
            },
            "executed": {
              "format": "date",
              "readOnly": true,
              "title": "дата выполнения задачи"
            },
            "id": {
              "title": "id задачи",
              "type": "number"
            },
            "prio": {
              "default": 100,
              "description": "чем выше приоритет, тем раньше выполнится задача",
              "title": "приоритет команды",
              "type": "number"
            },
            "response": {
              "readOnly": true,
              "title": "результат выполнения задачи",
              "type": "object"
            },
            "settings": {
              "type": "object"
            },
            "status": {
              "default": "NEW",
              "enum": [
                "NEW",
                "SUCCESS",
                "FAIL",
                "DELAYED",
                "STUCK",
                "PAUSED"
              ],
              "title": "статус задачи",
              "type": "string"
            },
            "user_id": {
              "title": "id пользователя",
              "type": "number"
            },
            "user_service_id": {
              "title": "id услуги пользователя",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_spool_delete",
    "method": "DELETE",
    "path": "/admin/spool",
    "spec": "admin",
    "tag": "Задачи",
    "summary": "Удалить задачу",
    "description": "DELETE /admin/spool\nУдалить задачу\nТег: Задачи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number",
          "description": "id задачи"
        },
        "user_id": {
          "type": "number",
          "description": "id пользователя"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "admin_spool_history_get",
    "method": "GET",
    "path": "/admin/spool/history",
    "spec": "admin",
    "tag": "Задачи",
    "summary": "Список архива задач",
    "description": "GET /admin/spool/history\nСписок архива задач\nТег: Задачи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "number",
          "description": "id пользователя"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        }
      }
    }
  },
  {
    "name": "admin_spool_manual_by_action_post",
    "method": "POST",
    "path": "/admin/spool/manual/{action}",
    "spec": "admin",
    "tag": "Задачи",
    "summary": "Изменить статус задачи вручную",
    "description": "POST /admin/spool/manual/{action}\nИзменить статус задачи вручную\nТег: Задачи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "action": {
          "description": "path параметр \"action\""
        },
        "body": {
          "properties": {
            "id": {
              "title": "id задачи",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "action"
      ]
    }
  },
  {
    "name": "admin_spool_statuses_get",
    "method": "GET",
    "path": "/admin/spool/statuses",
    "spec": "admin",
    "tag": "Задачи",
    "summary": "Статусы задач",
    "description": "GET /admin/spool/statuses\nСтатусы задач\nТег: Задачи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        }
      }
    }
  },
  {
    "name": "admin_storage_manage_get",
    "method": "GET",
    "path": "/admin/storage/manage",
    "spec": "admin",
    "tag": "Хранилище",
    "summary": "Получить список объектов хранилища",
    "description": "GET /admin/storage/manage\nПолучить список объектов хранилища\nТег: Хранилище\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "number",
          "description": "id пользователя"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        }
      }
    }
  },
  {
    "name": "admin_storage_manage_post",
    "method": "POST",
    "path": "/admin/storage/manage",
    "spec": "admin",
    "tag": "Хранилище",
    "summary": "Изменить данные в объекте хранилища",
    "description": "POST /admin/storage/manage\nИзменить данные в объекте хранилища\nТег: Хранилище\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "created": {
              "readOnly": true,
              "title": "дата создания",
              "type": "string"
            },
            "data": {
              "title": "данные",
              "type": "string"
            },
            "name": {
              "title": "имя ключа",
              "type": "string"
            },
            "settings": {
              "type": "object"
            },
            "user_id": {
              "title": "id пользователя",
              "type": "number"
            },
            "user_service_id": {
              "title": "id услуги пользователя",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_storage_manage_put",
    "method": "PUT",
    "path": "/admin/storage/manage",
    "spec": "admin",
    "tag": "Хранилище",
    "summary": "Создать объект в хранилище",
    "description": "PUT /admin/storage/manage\nСоздать объект в хранилище\nТег: Хранилище\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "created": {
              "readOnly": true,
              "title": "дата создания",
              "type": "string"
            },
            "data": {
              "title": "данные",
              "type": "string"
            },
            "name": {
              "title": "имя ключа",
              "type": "string"
            },
            "settings": {
              "type": "object"
            },
            "user_id": {
              "title": "id пользователя",
              "type": "number"
            },
            "user_service_id": {
              "title": "id услуги пользователя",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_storage_manage_delete",
    "method": "DELETE",
    "path": "/admin/storage/manage",
    "spec": "admin",
    "tag": "Хранилище",
    "summary": "Удалить объект из хранилища",
    "description": "DELETE /admin/storage/manage\nУдалить объект из хранилища\nТег: Хранилище\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "number",
          "description": "id пользователя"
        },
        "name": {
          "type": "string",
          "description": "имя ключа"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "user_id",
        "name"
      ]
    }
  },
  {
    "name": "admin_storage_manage_by_name_get",
    "method": "GET",
    "path": "/admin/storage/manage/{name}",
    "spec": "admin",
    "tag": "Хранилище",
    "summary": "Получить объект хранилища",
    "description": "GET /admin/storage/manage/{name}\nПолучить объект хранилища\nТег: Хранилище\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "имя ключа"
        },
        "user_id": {
          "type": "number",
          "description": "id пользователя"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        }
      },
      "required": [
        "name",
        "user_id"
      ]
    }
  },
  {
    "name": "admin_template_get",
    "method": "GET",
    "path": "/admin/template",
    "spec": "admin",
    "tag": "Шаблоны",
    "summary": "Список шаблонов",
    "description": "GET /admin/template\nСписок шаблонов\nТег: Шаблоны\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        }
      }
    }
  },
  {
    "name": "admin_template_post",
    "method": "POST",
    "path": "/admin/template",
    "spec": "admin",
    "tag": "Шаблоны",
    "summary": "Изменить шаблон ",
    "description": "POST /admin/template\nИзменить шаблон \nТег: Шаблоны\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "data": {
              "title": "шаблон",
              "type": "string"
            },
            "id": {
              "title": "имя шаблона",
              "type": "string"
            },
            "settings": {
              "type": "object"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_template_put",
    "method": "PUT",
    "path": "/admin/template",
    "spec": "admin",
    "tag": "Шаблоны",
    "summary": "Создать шаблон",
    "description": "PUT /admin/template\nСоздать шаблон\nТег: Шаблоны\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "data": {
              "title": "шаблон",
              "type": "string"
            },
            "id": {
              "title": "имя шаблона",
              "type": "string"
            },
            "settings": {
              "type": "object"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_template_delete",
    "method": "DELETE",
    "path": "/admin/template",
    "spec": "admin",
    "tag": "Шаблоны",
    "summary": "Удалить шаблон",
    "description": "DELETE /admin/template\nУдалить шаблон\nТег: Шаблоны\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "имя шаблона"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "admin_template_by_id_get",
    "method": "GET",
    "path": "/admin/template/{id}",
    "spec": "admin",
    "tag": "Шаблоны",
    "summary": "Прочитать шаблон",
    "description": "GET /admin/template/{id}\nПрочитать шаблон\nТег: Шаблоны\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "имя шаблона"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "admin_user_get",
    "method": "GET",
    "path": "/admin/user",
    "spec": "admin",
    "tag": "Пользователи",
    "summary": "Список клиентов",
    "description": "GET /admin/user\nСписок клиентов\nТег: Пользователи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "number",
          "description": "id пользователя"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        }
      }
    }
  },
  {
    "name": "admin_user_post",
    "method": "POST",
    "path": "/admin/user",
    "spec": "admin",
    "tag": "Пользователи",
    "summary": "Изменить клиента",
    "description": "POST /admin/user\nИзменить клиента\nТег: Пользователи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "balance": {
              "default": 0,
              "title": "баланс",
              "type": "number"
            },
            "block": {
              "default": 0,
              "description": "0 - активен, 1 - заблокирован",
              "enum": [
                0,
                1
              ],
              "title": "флаг блокировки",
              "type": "number"
            },
            "bonus": {
              "default": 0,
              "title": "бонусы",
              "type": "number"
            },
            "can_overdraft": {
              "default": 0,
              "description": "1 - разрешено уходить в минус",
              "enum": [
                0,
                1
              ],
              "title": "флаг разрешения ухода в минус",
              "type": "number"
            },
            "comment": {
              "title": "комментарии",
              "type": "string"
            },
            "create_act": {
              "default": 1,
              "enum": [
                0,
                1
              ],
              "title": "создавать акты",
              "type": "number"
            },
            "created": {
              "format": "date",
              "title": "дата создания"
            },
            "credit": {
              "default": 0,
              "title": "сумма кредита",
              "type": "number"
            },
            "discount": {
              "default": 0,
              "title": "персональная скидка",
              "type": "number"
            },
            "dogovor": {
              "title": "договор",
              "type": "string"
            },
            "full_name": {
              "description": "произвольное значение",
              "title": "наименование клиента",
              "type": "string"
            },
            "gid": {
              "default": 0,
              "description": "0 - пользователи, 1 - админы",
              "enum": [
                0,
                1
              ],
              "title": "группа",
              "type": "number"
            },
            "last_login": {
              "format": "date",
              "title": "дата последнего входа"
            },
            "login": {
              "title": "логин",
              "type": "string"
            },
            "login2": {
              "default": null,
              "title": "логин (дополнительный)",
              "type": "string"
            },
            "partner_id": {
              "title": "id партнера",
              "type": "number"
            },
            "password": {
              "description": "пароль в зашифровнном виде",
              "title": "пароль",
              "type": "string"
            },
            "perm_credit": {
              "default": 0,
              "enum": [
                0,
                1
              ],
              "title": "флаг постоянного кредита",
              "type": "number"
            },
            "phone": {
              "title": "номер телефона",
              "type": "string"
            },
            "settings": {
              "title": "настройки клиента",
              "type": "object"
            },
            "type": {
              "default": 0,
              "description": "0 - физ, 1 - юр, 2 - ип",
              "enum": [
                0,
                1,
                2
              ],
              "title": "тип пользователя",
              "type": "number"
            },
            "user_id": {
              "title": "id пользователя",
              "type": "number"
            },
            "verified": {
              "default": 0,
              "enum": [
                0,
                1
              ],
              "title": "флаг проверки клиента",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_user_put",
    "method": "PUT",
    "path": "/admin/user",
    "spec": "admin",
    "tag": "Пользователи",
    "summary": "Создать клиента",
    "description": "PUT /admin/user\nСоздать клиента\nТег: Пользователи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "balance": {
              "default": 0,
              "title": "баланс",
              "type": "number"
            },
            "block": {
              "default": 0,
              "description": "0 - активен, 1 - заблокирован",
              "enum": [
                0,
                1
              ],
              "title": "флаг блокировки",
              "type": "number"
            },
            "bonus": {
              "default": 0,
              "title": "бонусы",
              "type": "number"
            },
            "can_overdraft": {
              "default": 0,
              "description": "1 - разрешено уходить в минус",
              "enum": [
                0,
                1
              ],
              "title": "флаг разрешения ухода в минус",
              "type": "number"
            },
            "comment": {
              "title": "комментарии",
              "type": "string"
            },
            "create_act": {
              "default": 1,
              "enum": [
                0,
                1
              ],
              "title": "создавать акты",
              "type": "number"
            },
            "created": {
              "format": "date",
              "title": "дата создания"
            },
            "credit": {
              "default": 0,
              "title": "сумма кредита",
              "type": "number"
            },
            "discount": {
              "default": 0,
              "title": "персональная скидка",
              "type": "number"
            },
            "dogovor": {
              "title": "договор",
              "type": "string"
            },
            "full_name": {
              "description": "произвольное значение",
              "title": "наименование клиента",
              "type": "string"
            },
            "gid": {
              "default": 0,
              "description": "0 - пользователи, 1 - админы",
              "enum": [
                0,
                1
              ],
              "title": "группа",
              "type": "number"
            },
            "last_login": {
              "format": "date",
              "title": "дата последнего входа"
            },
            "login": {
              "title": "логин",
              "type": "string"
            },
            "login2": {
              "default": null,
              "title": "логин (дополнительный)",
              "type": "string"
            },
            "partner_id": {
              "title": "id партнера",
              "type": "number"
            },
            "password": {
              "description": "пароль в зашифровнном виде",
              "title": "пароль",
              "type": "string"
            },
            "perm_credit": {
              "default": 0,
              "enum": [
                0,
                1
              ],
              "title": "флаг постоянного кредита",
              "type": "number"
            },
            "phone": {
              "title": "номер телефона",
              "type": "string"
            },
            "settings": {
              "title": "настройки клиента",
              "type": "object"
            },
            "type": {
              "default": 0,
              "description": "0 - физ, 1 - юр, 2 - ип",
              "enum": [
                0,
                1,
                2
              ],
              "title": "тип пользователя",
              "type": "number"
            },
            "user_id": {
              "title": "id пользователя",
              "type": "number"
            },
            "verified": {
              "default": 0,
              "enum": [
                0,
                1
              ],
              "title": "флаг проверки клиента",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_user_delete",
    "method": "DELETE",
    "path": "/admin/user",
    "spec": "admin",
    "tag": "Пользователи",
    "summary": "Удалить клиента",
    "description": "DELETE /admin/user\nУдалить клиента\nТег: Пользователи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "number",
          "description": "id пользователя"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "user_id"
      ]
    }
  },
  {
    "name": "admin_user_bonus_get",
    "method": "GET",
    "path": "/admin/user/bonus",
    "spec": "admin",
    "tag": "Бонусы",
    "summary": "Список бонусов клиентов",
    "description": "GET /admin/user/bonus\nСписок бонусов клиентов\nТег: Бонусы\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "number",
          "description": "id пользователя"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        }
      }
    }
  },
  {
    "name": "admin_user_bonus_post",
    "method": "POST",
    "path": "/admin/user/bonus",
    "spec": "admin",
    "tag": "Бонусы",
    "summary": "Изменить бонус",
    "description": "POST /admin/user/bonus\nИзменить бонус\nТег: Бонусы\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "bonus": {
              "title": "кол-во бонусов",
              "type": "number"
            },
            "comment": {
              "title": "комментарий",
              "type": "object"
            },
            "date": {
              "format": "date",
              "title": "дата создания бонуса"
            },
            "id": {
              "title": "id бонуса",
              "type": "number"
            },
            "user_id": {
              "title": "id пользователя",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_user_bonus_put",
    "method": "PUT",
    "path": "/admin/user/bonus",
    "spec": "admin",
    "tag": "Бонусы",
    "summary": "Создать бонус",
    "description": "PUT /admin/user/bonus\nСоздать бонус\nТег: Бонусы\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "bonus": {
              "title": "кол-во бонусов",
              "type": "number"
            },
            "comment": {
              "title": "комментарий",
              "type": "object"
            },
            "date": {
              "format": "date",
              "title": "дата создания бонуса"
            },
            "id": {
              "title": "id бонуса",
              "type": "number"
            },
            "user_id": {
              "title": "id пользователя",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_user_bonus_delete",
    "method": "DELETE",
    "path": "/admin/user/bonus",
    "spec": "admin",
    "tag": "Бонусы",
    "summary": "Удалить бонус",
    "description": "DELETE /admin/user/bonus\nУдалить бонус\nТег: Бонусы\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number",
          "description": "id бонуса"
        },
        "user_id": {
          "type": "number",
          "description": "id пользователя"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "id",
        "user_id"
      ]
    }
  },
  {
    "name": "admin_user_passwd_post",
    "method": "POST",
    "path": "/admin/user/passwd",
    "spec": "admin",
    "tag": "Пользователи",
    "summary": "Сменить пароль клиенту",
    "description": "POST /admin/user/passwd\nСменить пароль клиенту\nТег: Пользователи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "password": {
              "description": "пароль в зашифровнном виде",
              "title": "пароль",
              "type": "string"
            },
            "user_id": {
              "title": "id пользователя",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_user_pay_get",
    "method": "GET",
    "path": "/admin/user/pay",
    "spec": "admin",
    "tag": "Платежи",
    "summary": "Список платежей клиентов",
    "description": "GET /admin/user/pay\nСписок платежей клиентов\nТег: Платежи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "number",
          "description": "id пользователя"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        }
      }
    }
  },
  {
    "name": "admin_user_pay_delete",
    "method": "DELETE",
    "path": "/admin/user/pay",
    "spec": "admin",
    "tag": "Платежи",
    "summary": "Удалить платеж клиента",
    "description": "DELETE /admin/user/pay\nУдалить платеж клиента\nТег: Платежи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "number",
          "description": "id пользователя"
        },
        "id": {
          "type": "number",
          "description": "id платежа"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "user_id",
        "id"
      ]
    }
  },
  {
    "name": "admin_user_payment_put",
    "method": "PUT",
    "path": "/admin/user/payment",
    "spec": "admin",
    "tag": "Пользователи",
    "summary": "Зачислить деньги клиенту",
    "description": "PUT /admin/user/payment\nЗачислить деньги клиенту\nТег: Пользователи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "money": {},
            "user_id": {
              "title": "id пользователя",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_user_search_get",
    "method": "GET",
    "path": "/admin/user/search",
    "spec": "admin",
    "tag": "Пользователи",
    "summary": "Поиск клиентов",
    "description": "GET /admin/user/search\nПоиск клиентов\nТег: Пользователи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        }
      }
    }
  },
  {
    "name": "admin_user_service_get",
    "method": "GET",
    "path": "/admin/user/service",
    "spec": "admin",
    "tag": "Услуги пользователей",
    "summary": "Список услуг клиентов",
    "description": "GET /admin/user/service\nСписок услуг клиентов\nТег: Услуги пользователей\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "number",
          "description": "id пользователя услуги"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        }
      }
    }
  },
  {
    "name": "admin_user_service_post",
    "method": "POST",
    "path": "/admin/user/service",
    "spec": "admin",
    "tag": "Услуги пользователей",
    "summary": "Изменить услугу клиента",
    "description": "POST /admin/user/service\nИзменить услугу клиента\nТег: Услуги пользователей\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "auto_bill": {
              "default": 1,
              "description": "0 - биллинг выключен для услуги, 1 - включен",
              "enum": [
                0,
                1
              ],
              "title": "флаг работы биллинг",
              "type": "number"
            },
            "category": {
              "title": "категория услуги",
              "type": "string"
            },
            "created": {
              "format": "date",
              "readOnly": true,
              "title": "дата создания услуги пользователя"
            },
            "expire": {
              "format": "date",
              "title": "дата истечения услуги пользователя"
            },
            "next": {
              "description": "-1 - услуга будет удалена",
              "title": "id следующей услуги",
              "type": "number"
            },
            "parent": {
              "title": "id родительской услуги",
              "type": "number"
            },
            "service": {
              "type": "object"
            },
            "service_id": {
              "title": "id услуги",
              "type": "number"
            },
            "settings": {
              "title": "произвольные настройки услуги",
              "type": "object"
            },
            "status": {
              "default": "INIT",
              "enum": [
                "INIT",
                "NOT PAID",
                "PROGRESS",
                "ACTIVE",
                "BLOCK",
                "REMOVED",
                "ERROR"
              ],
              "readOnly": true,
              "title": "статус услуги",
              "type": "string"
            },
            "status_before": {
              "default": "INIT",
              "readOnly": true,
              "title": "предыдущий статус услуги",
              "type": "string"
            },
            "user_id": {
              "title": "id пользователя услуги",
              "type": "number"
            },
            "user_service_id": {
              "title": "id услуги пользоватея",
              "type": "number"
            },
            "withdraw_id": {
              "title": "id списания",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_user_service_delete",
    "method": "DELETE",
    "path": "/admin/user/service",
    "spec": "admin",
    "tag": "Услуги пользователей",
    "summary": "Удалить услугу клиента",
    "description": "DELETE /admin/user/service\nУдалить услугу клиента\nТег: Услуги пользователей\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "number",
          "description": "id пользователя услуги"
        },
        "user_service_id": {
          "type": "number",
          "description": "id услуги пользоватея"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "user_id",
        "user_service_id"
      ]
    }
  },
  {
    "name": "admin_user_service_activate_post",
    "method": "POST",
    "path": "/admin/user/service/activate",
    "spec": "admin",
    "tag": "Услуги пользователей",
    "summary": "Возобновить услугу клиента",
    "description": "POST /admin/user/service/activate\nВозобновить услугу клиента\nТег: Услуги пользователей\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "user_id": {
              "title": "id пользователя услуги",
              "type": "number"
            },
            "user_service_id": {
              "title": "id услуги пользоватея",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_user_service_categories_get",
    "method": "GET",
    "path": "/admin/user/service/categories",
    "spec": "admin",
    "tag": "Услуги пользователей",
    "summary": "Получить список категорий услуг",
    "description": "GET /admin/user/service/categories\nПолучить список категорий услуг\nТег: Услуги пользователей\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        }
      }
    }
  },
  {
    "name": "admin_user_service_change_post",
    "method": "POST",
    "path": "/admin/user/service/change",
    "spec": "admin",
    "tag": "Услуги пользователей",
    "summary": "Сменить тариф услуги клиента",
    "description": "POST /admin/user/service/change\nСменить тариф услуги клиента\nТег: Услуги пользователей\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "service_id": {
              "title": "id услуги",
              "type": "number"
            },
            "user_id": {
              "title": "id пользователя услуги",
              "type": "number"
            },
            "user_service_id": {
              "title": "id услуги пользоватея",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_user_service_spool_get",
    "method": "GET",
    "path": "/admin/user/service/spool",
    "spec": "admin",
    "tag": "Услуги пользователей",
    "summary": "Получить список текущих задач для услуги клиента",
    "description": "GET /admin/user/service/spool\nПолучить список текущих задач для услуги клиента\nТег: Услуги пользователей\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "number",
          "description": "id пользователя услуги"
        },
        "user_service_id": {
          "type": "number",
          "description": "id услуги пользоватея"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        }
      },
      "required": [
        "user_id",
        "user_service_id"
      ]
    }
  },
  {
    "name": "admin_user_service_status_post",
    "method": "POST",
    "path": "/admin/user/service/status",
    "spec": "admin",
    "tag": "Услуги пользователей",
    "summary": "Сменить статус услуги клиента",
    "description": "POST /admin/user/service/status\nСменить статус услуги клиента\nТег: Услуги пользователей\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "status": {
              "default": "INIT",
              "enum": [
                "INIT",
                "NOT PAID",
                "PROGRESS",
                "ACTIVE",
                "BLOCK",
                "REMOVED",
                "ERROR"
              ],
              "title": "статус услуги",
              "type": "string"
            },
            "user_id": {
              "title": "id пользователя услуги",
              "type": "number"
            },
            "user_service_id": {
              "title": "id услуги пользоватея",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_user_service_stop_post",
    "method": "POST",
    "path": "/admin/user/service/stop",
    "spec": "admin",
    "tag": "Услуги пользователей",
    "summary": "Остановить услугу клиента",
    "description": "POST /admin/user/service/stop\nОстановить услугу клиента\nТег: Услуги пользователей\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "user_id": {
              "title": "id пользователя услуги",
              "type": "number"
            },
            "user_service_id": {
              "title": "id услуги пользоватея",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_user_service_touch_post",
    "method": "POST",
    "path": "/admin/user/service/touch",
    "spec": "admin",
    "tag": "Услуги пользователей",
    "summary": "Обработать услугу",
    "description": "POST /admin/user/service/touch\nОбработать услугу\nТег: Услуги пользователей\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "user_id": {
              "title": "id пользователя услуги",
              "type": "number"
            },
            "user_service_id": {
              "title": "id услуги пользоватея",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_user_service_withdraw_get",
    "method": "GET",
    "path": "/admin/user/service/withdraw",
    "spec": "admin",
    "tag": "Списания",
    "summary": "Получить список списаний клиентов",
    "description": "GET /admin/user/service/withdraw\nПолучить список списаний клиентов\nТег: Списания\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "number",
          "description": "id пользователя"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        }
      }
    }
  },
  {
    "name": "admin_user_service_withdraw_post",
    "method": "POST",
    "path": "/admin/user/service/withdraw",
    "spec": "admin",
    "tag": "Списания",
    "summary": "Изменить списание клиента",
    "description": "POST /admin/user/service/withdraw\nИзменить списание клиента\nТег: Списания\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "bonus": {
              "default": 0,
              "title": "кол-во бонусов",
              "type": "number"
            },
            "cost": {
              "title": "стоимость",
              "type": "number"
            },
            "create_date": {
              "format": "date",
              "readOnly": true,
              "title": "дата создания списания"
            },
            "discount": {
              "default": 0,
              "title": "скидка",
              "type": "number"
            },
            "end_date": {
              "format": "date",
              "readOnly": true,
              "title": "дата окончания"
            },
            "months": {
              "default": 1,
              "title": "период",
              "type": "number"
            },
            "qnt": {
              "default": 1,
              "title": "кол-во",
              "type": "number"
            },
            "service_id": {
              "title": "id услуги",
              "type": "number"
            },
            "total": {
              "title": "итоговая стоимость",
              "type": "number"
            },
            "user_id": {
              "title": "id пользователя",
              "type": "number"
            },
            "user_service_id": {
              "title": "id услуги пользователя",
              "type": "number"
            },
            "withdraw_date": {
              "format": "date",
              "readOnly": true,
              "title": "дата списания"
            },
            "withdraw_id": {
              "title": "id списания",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_user_service_withdraw_put",
    "method": "PUT",
    "path": "/admin/user/service/withdraw",
    "spec": "admin",
    "tag": "Списания",
    "summary": "Создать списание клиенту",
    "description": "PUT /admin/user/service/withdraw\nСоздать списание клиенту\nТег: Списания\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "bonus": {
              "default": 0,
              "title": "кол-во бонусов",
              "type": "number"
            },
            "cost": {
              "title": "стоимость",
              "type": "number"
            },
            "create_date": {
              "format": "date",
              "readOnly": true,
              "title": "дата создания списания"
            },
            "discount": {
              "default": 0,
              "title": "скидка",
              "type": "number"
            },
            "end_date": {
              "format": "date",
              "readOnly": true,
              "title": "дата окончания"
            },
            "months": {
              "default": 1,
              "title": "период",
              "type": "number"
            },
            "qnt": {
              "default": 1,
              "title": "кол-во",
              "type": "number"
            },
            "service_id": {
              "title": "id услуги",
              "type": "number"
            },
            "total": {
              "title": "итоговая стоимость",
              "type": "number"
            },
            "user_id": {
              "title": "id пользователя",
              "type": "number"
            },
            "user_service_id": {
              "title": "id услуги пользователя",
              "type": "number"
            },
            "withdraw_date": {
              "format": "date",
              "readOnly": true,
              "title": "дата списания"
            },
            "withdraw_id": {
              "title": "id списания",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "admin_user_service_withdraw_delete",
    "method": "DELETE",
    "path": "/admin/user/service/withdraw",
    "spec": "admin",
    "tag": "Списания",
    "summary": "Удалить списание клиента",
    "description": "DELETE /admin/user/service/withdraw\nУдалить списание клиента\nТег: Списания\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "number",
          "description": "id пользователя"
        },
        "withdraw_id": {
          "type": "number",
          "description": "id списания"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "user_id",
        "withdraw_id"
      ]
    }
  },
  {
    "name": "admin_user_session_put",
    "method": "PUT",
    "path": "/admin/user/session",
    "spec": "admin",
    "tag": "Пользователи",
    "summary": "Сгенерировать session_id для клиента",
    "description": "PUT /admin/user/session\nСгенерировать session_id для клиента\nТег: Пользователи\nСпека: admin",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "user_id": {
              "title": "id пользователя",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_promo_get",
    "method": "GET",
    "path": "/promo",
    "spec": "user",
    "tag": "Промокоды",
    "summary": "Список промокодов пользователя",
    "description": "GET /promo\nСписок промокодов пользователя\nТег: Промокоды\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_promo_apply_by_code_get",
    "method": "GET",
    "path": "/promo/apply/{code}",
    "spec": "user",
    "tag": "Промокоды",
    "summary": "Применить промокод",
    "description": "GET /promo/apply/{code}\nПрименить промокод\nТег: Промокоды\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "code": {
          "description": "path параметр \"code\""
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      },
      "required": [
        "code"
      ]
    }
  },
  {
    "name": "user_public_by_id_get",
    "method": "GET",
    "path": "/public/{id}",
    "spec": "user",
    "tag": "Шаблоны",
    "summary": "Выполнить публичный шаблон",
    "description": "GET /public/{id}\nВыполнить публичный шаблон\nТег: Шаблоны\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "имя шаблона"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "user_public_by_id_post",
    "method": "POST",
    "path": "/public/{id}",
    "spec": "user",
    "tag": "Шаблоны",
    "summary": "Выполнить публичный шаблон с аргументами",
    "description": "POST /public/{id}\nВыполнить публичный шаблон с аргументами\nТег: Шаблоны\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "имя шаблона"
        },
        "body": {
          "properties": {
            "data": {
              "title": "шаблон",
              "type": "string"
            },
            "id": {
              "title": "имя шаблона",
              "type": "string"
            },
            "settings": {
              "type": "object"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "user_service_get",
    "method": "GET",
    "path": "/service",
    "spec": "user",
    "tag": "Услуги",
    "summary": "Информация об услуге",
    "description": "GET /service\nИнформация об услуге\nТег: Услуги\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "service_id": {
          "type": "number",
          "description": "id услуги"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      },
      "required": [
        "service_id"
      ]
    }
  },
  {
    "name": "user_service_order_get",
    "method": "GET",
    "path": "/service/order",
    "spec": "user",
    "tag": "Услуги",
    "summary": "Список услуг для заказа",
    "description": "GET /service/order\nСписок услуг для заказа\nТег: Услуги\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_service_order_put",
    "method": "PUT",
    "path": "/service/order",
    "spec": "user",
    "tag": "Услуги",
    "summary": "Регистрация услуги",
    "description": "PUT /service/order\nРегистрация услуги\nТег: Услуги\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "service_id": {
              "title": "id услуги",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_storage_download_by_name_get",
    "method": "GET",
    "path": "/storage/download/{name}",
    "spec": "user",
    "tag": "Хранилище",
    "summary": "Скачать данные из хранилища",
    "description": "GET /storage/download/{name}\nСкачать данные из хранилища\nТег: Хранилище\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "имя ключа"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      },
      "required": [
        "name"
      ]
    }
  },
  {
    "name": "user_storage_manage_get",
    "method": "GET",
    "path": "/storage/manage",
    "spec": "user",
    "tag": "Хранилище",
    "summary": "Список данных",
    "description": "GET /storage/manage\nСписок данных\nТег: Хранилище\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_storage_manage_post",
    "method": "POST",
    "path": "/storage/manage",
    "spec": "user",
    "tag": "Хранилище",
    "summary": "Изменить данные в хранилище",
    "description": "POST /storage/manage\nИзменить данные в хранилище\nТег: Хранилище\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "created": {
              "readOnly": true,
              "title": "дата создания",
              "type": "string"
            },
            "data": {
              "title": "данные",
              "type": "string"
            },
            "name": {
              "title": "имя ключа",
              "type": "string"
            },
            "settings": {
              "type": "object"
            },
            "user_id": {
              "readOnly": true,
              "title": "id пользователя",
              "type": "number"
            },
            "user_service_id": {
              "title": "id услуги пользователя",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_storage_manage_put",
    "method": "PUT",
    "path": "/storage/manage",
    "spec": "user",
    "tag": "Хранилище",
    "summary": "Создать данные в хранилище",
    "description": "PUT /storage/manage\nСоздать данные в хранилище\nТег: Хранилище\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "created": {
              "readOnly": true,
              "title": "дата создания",
              "type": "string"
            },
            "data": {
              "title": "данные",
              "type": "string"
            },
            "name": {
              "title": "имя ключа",
              "type": "string"
            },
            "settings": {
              "type": "object"
            },
            "user_id": {
              "readOnly": true,
              "title": "id пользователя",
              "type": "number"
            },
            "user_service_id": {
              "title": "id услуги пользователя",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_storage_manage_delete",
    "method": "DELETE",
    "path": "/storage/manage",
    "spec": "user",
    "tag": "Хранилище",
    "summary": "Удалить данные в хранилище",
    "description": "DELETE /storage/manage\nУдалить данные в хранилище\nТег: Хранилище\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "имя ключа"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "name"
      ]
    }
  },
  {
    "name": "user_storage_manage_by_name_get",
    "method": "GET",
    "path": "/storage/manage/{name}",
    "spec": "user",
    "tag": "Хранилище",
    "summary": "Прочитать данные из хранилища",
    "description": "GET /storage/manage/{name}\nПрочитать данные из хранилища\nТег: Хранилище\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "имя ключа"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      },
      "required": [
        "name"
      ]
    }
  },
  {
    "name": "user_storage_manage_by_name_post",
    "method": "POST",
    "path": "/storage/manage/{name}",
    "spec": "user",
    "tag": "Хранилище",
    "summary": "Изменить данные в хранилище",
    "description": "POST /storage/manage/{name}\nИзменить данные в хранилище\nТег: Хранилище\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "имя ключа"
        },
        "body": {
          "type": "string",
          "description": "Тело запроса (text/plain)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "name"
      ]
    }
  },
  {
    "name": "user_storage_manage_by_name_put",
    "method": "PUT",
    "path": "/storage/manage/{name}",
    "spec": "user",
    "tag": "Хранилище",
    "summary": "Создать данные в хранилище",
    "description": "PUT /storage/manage/{name}\nСоздать данные в хранилище\nТег: Хранилище\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "имя ключа"
        },
        "body": {
          "type": "string",
          "description": "Тело запроса (text/plain)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "name"
      ]
    }
  },
  {
    "name": "user_storage_manage_by_name_delete",
    "method": "DELETE",
    "path": "/storage/manage/{name}",
    "spec": "user",
    "tag": "Хранилище",
    "summary": "Удалить данные из хранилища",
    "description": "DELETE /storage/manage/{name}\nУдалить данные из хранилища\nТег: Хранилище\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "имя ключа"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "name"
      ]
    }
  },
  {
    "name": "user_telegram_bot_by_template_post",
    "method": "POST",
    "path": "/telegram/bot/{template}",
    "spec": "user",
    "tag": "Telegram bot",
    "summary": "Приём данных от Telegram",
    "description": "POST /telegram/bot/{template}\nПриём данных от Telegram\nТег: Telegram bot\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "template": {
          "description": "path параметр \"template\""
        },
        "body": {
          "properties": {},
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "template"
      ]
    }
  },
  {
    "name": "user_telegram_user_get",
    "method": "GET",
    "path": "/telegram/user",
    "spec": "user",
    "tag": "Telegram bot",
    "summary": "Получить настройки пользователя для Telegram бота",
    "description": "GET /telegram/user\nПолучить настройки пользователя для Telegram бота\nТег: Telegram bot\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_telegram_user_post",
    "method": "POST",
    "path": "/telegram/user",
    "spec": "user",
    "tag": "Telegram bot",
    "summary": "Изменить настройки пользователя для Telegram бота",
    "description": "POST /telegram/user\nИзменить настройки пользователя для Telegram бота\nТег: Telegram bot\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {},
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_telegram_user_delete",
    "method": "DELETE",
    "path": "/telegram/user",
    "spec": "user",
    "tag": "Telegram bot",
    "summary": "Удалить (отвязать) Telegram аккаунт пользователя",
    "description": "DELETE /telegram/user\nУдалить (отвязать) Telegram аккаунт пользователя\nТег: Telegram bot\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_telegram_web_auth_post",
    "method": "POST",
    "path": "/telegram/web/auth",
    "spec": "user",
    "tag": "Telegram bot",
    "summary": "Авторизация через Telegram Login (OIDC id_token или legacy Widget)",
    "description": "POST /telegram/web/auth\nАвторизация через Telegram Login (OIDC id_token или legacy Widget)\nТег: Telegram bot\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {},
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_telegram_web_auth_init_get",
    "method": "GET",
    "path": "/telegram/web/auth/init",
    "spec": "user",
    "tag": "Telegram bot",
    "summary": "Инициализация Telegram Login OIDC (state, nonce, PKCE)",
    "description": "GET /telegram/web/auth/init\nИнициализация Telegram Login OIDC (state, nonce, PKCE)\nТег: Telegram bot\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_telegram_web_auth_start_get",
    "method": "GET",
    "path": "/telegram/web/auth/start",
    "spec": "user",
    "tag": "Telegram bot",
    "summary": "Старт Telegram Login OIDC с HTTP redirect на Telegram OAuth",
    "description": "GET /telegram/web/auth/start\nСтарт Telegram Login OIDC с HTTP redirect на Telegram OAuth\nТег: Telegram bot\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_telegram_web_callback_get",
    "method": "GET",
    "path": "/telegram/web/callback",
    "spec": "user",
    "tag": "Telegram bot",
    "summary": "Callback endpoint для Telegram Login (OIDC code flow)",
    "description": "GET /telegram/web/callback\nCallback endpoint для Telegram Login (OIDC code flow)\nТег: Telegram bot\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_telegram_webapp_auth_get",
    "method": "GET",
    "path": "/telegram/webapp/auth",
    "spec": "user",
    "tag": "Telegram bot",
    "summary": "Авторизация Telegram",
    "description": "GET /telegram/webapp/auth\nАвторизация Telegram\nТег: Telegram bot\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "initData": {
          "description": "query параметр \"initData\""
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      },
      "required": [
        "initData"
      ]
    }
  },
  {
    "name": "user_template_by_id_get",
    "method": "GET",
    "path": "/template/{id}",
    "spec": "user",
    "tag": "Шаблоны",
    "summary": "Выполнить шаблон",
    "description": "GET /template/{id}\nВыполнить шаблон\nТег: Шаблоны\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "имя шаблона"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "user_template_by_id_post",
    "method": "POST",
    "path": "/template/{id}",
    "spec": "user",
    "tag": "Шаблоны",
    "summary": "Выполнить шаблон с аргументами",
    "description": "POST /template/{id}\nВыполнить шаблон с аргументами\nТег: Шаблоны\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "имя шаблона"
        },
        "body": {
          "properties": {
            "data": {
              "title": "шаблон",
              "type": "string"
            },
            "id": {
              "title": "имя шаблона",
              "type": "string"
            },
            "settings": {
              "type": "object"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "user_get",
    "method": "GET",
    "path": "/user",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Получение пользователя",
    "description": "GET /user\nПолучение пользователя\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_post",
    "method": "POST",
    "path": "/user",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Изменить пользователя",
    "description": "POST /user\nИзменить пользователя\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "balance": {
              "default": 0,
              "title": "баланс",
              "type": "number"
            },
            "bonus": {
              "default": 0,
              "title": "бонусы",
              "type": "number"
            },
            "created": {
              "format": "date",
              "title": "дата создания"
            },
            "credit": {
              "default": 0,
              "title": "сумма кредита",
              "type": "number"
            },
            "discount": {
              "default": 0,
              "title": "персональная скидка",
              "type": "number"
            },
            "dogovor": {
              "title": "договор",
              "type": "string"
            },
            "full_name": {
              "description": "произвольное значение",
              "title": "наименование клиента",
              "type": "string"
            },
            "last_login": {
              "format": "date",
              "title": "дата последнего входа"
            },
            "login": {
              "title": "логин",
              "type": "string"
            },
            "login2": {
              "default": null,
              "title": "логин (дополнительный)",
              "type": "string"
            },
            "phone": {
              "title": "номер телефона",
              "type": "string"
            },
            "user_id": {
              "readOnly": true,
              "title": "id пользователя",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_put",
    "method": "PUT",
    "path": "/user",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Регистрация пользователя",
    "description": "PUT /user\nРегистрация пользователя\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "login": {
              "title": "логин",
              "type": "string"
            },
            "password": {
              "description": "пароль в зашифровнном виде",
              "title": "пароль",
              "type": "string"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_auth_post",
    "method": "POST",
    "path": "/user/auth",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Авторизация (получение `session_id`)",
    "description": "POST /user/auth\nАвторизация (получение `session_id`)\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "login": {
              "title": "логин",
              "type": "string"
            },
            "password": {
              "description": "пароль в зашифровнном виде",
              "title": "пароль",
              "type": "string"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_auth_passkey_get",
    "method": "GET",
    "path": "/user/auth/passkey",
    "spec": "user",
    "tag": "Passkey Аутентификация",
    "summary": "Получить параметры публичной аутентификации Passkey",
    "description": "GET /user/auth/passkey\nПолучить параметры публичной аутентификации Passkey\nТег: Passkey Аутентификация\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_auth_passkey_post",
    "method": "POST",
    "path": "/user/auth/passkey",
    "spec": "user",
    "tag": "Passkey Аутентификация",
    "summary": "Аутентификация пользователя с помощью Passkey",
    "description": "POST /user/auth/passkey\nАутентификация пользователя с помощью Passkey\nТег: Passkey Аутентификация\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "credential_id": {},
            "response": {}
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_autopayment_get",
    "method": "GET",
    "path": "/user/autopayment",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Список автоплатежей пользователя",
    "description": "GET /user/autopayment\nСписок автоплатежей пользователя\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_autopayment_delete",
    "method": "DELETE",
    "path": "/user/autopayment",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Удалить автоплатежи пользователя",
    "description": "DELETE /user/autopayment\nУдалить автоплатежи пользователя\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_captcha_get",
    "method": "GET",
    "path": "/user/captcha",
    "spec": "user",
    "tag": "Капча",
    "summary": "Получение капчи",
    "description": "GET /user/captcha\nПолучение капчи\nТег: Капча\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_email_get",
    "method": "GET",
    "path": "/user/email",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Получить email пользователя",
    "description": "GET /user/email\nПолучить email пользователя\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_email_post",
    "method": "POST",
    "path": "/user/email",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Верифицировать email пользователя",
    "description": "POST /user/email\nВерифицировать email пользователя\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "balance": {
              "default": 0,
              "title": "баланс",
              "type": "number"
            },
            "bonus": {
              "default": 0,
              "title": "бонусы",
              "type": "number"
            },
            "created": {
              "format": "date",
              "title": "дата создания"
            },
            "credit": {
              "default": 0,
              "title": "сумма кредита",
              "type": "number"
            },
            "discount": {
              "default": 0,
              "title": "персональная скидка",
              "type": "number"
            },
            "dogovor": {
              "title": "договор",
              "type": "string"
            },
            "full_name": {
              "description": "произвольное значение",
              "title": "наименование клиента",
              "type": "string"
            },
            "last_login": {
              "format": "date",
              "title": "дата последнего входа"
            },
            "login": {
              "title": "логин",
              "type": "string"
            },
            "login2": {
              "default": null,
              "title": "логин (дополнительный)",
              "type": "string"
            },
            "phone": {
              "title": "номер телефона",
              "type": "string"
            },
            "user_id": {
              "readOnly": true,
              "title": "id пользователя",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_email_put",
    "method": "PUT",
    "path": "/user/email",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Установить email пользователя",
    "description": "PUT /user/email\nУстановить email пользователя\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "email": {}
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_email_delete",
    "method": "DELETE",
    "path": "/user/email",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Удалить email пользователя",
    "description": "DELETE /user/email\nУдалить email пользователя\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_email_verify_post",
    "method": "POST",
    "path": "/user/email/verify",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Верификация email пользователя",
    "description": "POST /user/email/verify\nВерификация email пользователя\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "balance": {
              "default": 0,
              "title": "баланс",
              "type": "number"
            },
            "bonus": {
              "default": 0,
              "title": "бонусы",
              "type": "number"
            },
            "created": {
              "format": "date",
              "title": "дата создания"
            },
            "credit": {
              "default": 0,
              "title": "сумма кредита",
              "type": "number"
            },
            "discount": {
              "default": 0,
              "title": "персональная скидка",
              "type": "number"
            },
            "dogovor": {
              "title": "договор",
              "type": "string"
            },
            "full_name": {
              "description": "произвольное значение",
              "title": "наименование клиента",
              "type": "string"
            },
            "last_login": {
              "format": "date",
              "title": "дата последнего входа"
            },
            "login": {
              "title": "логин",
              "type": "string"
            },
            "login2": {
              "default": null,
              "title": "логин (дополнительный)",
              "type": "string"
            },
            "phone": {
              "title": "номер телефона",
              "type": "string"
            },
            "user_id": {
              "readOnly": true,
              "title": "id пользователя",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_otp_get",
    "method": "GET",
    "path": "/user/otp",
    "spec": "user",
    "tag": "OTP",
    "summary": "Статус OTP",
    "description": "GET /user/otp\nСтатус OTP\nТег: OTP\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_otp_post",
    "method": "POST",
    "path": "/user/otp",
    "spec": "user",
    "tag": "OTP",
    "summary": "Проверка OTP",
    "description": "POST /user/otp\nПроверка OTP\nТег: OTP\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "token": {}
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_otp_put",
    "method": "PUT",
    "path": "/user/otp",
    "spec": "user",
    "tag": "OTP",
    "summary": "Включение OTP",
    "description": "PUT /user/otp\nВключение OTP\nТег: OTP\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "token": {}
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_otp_delete",
    "method": "DELETE",
    "path": "/user/otp",
    "spec": "user",
    "tag": "OTP",
    "summary": "Отключение OTP",
    "description": "DELETE /user/otp\nОтключение OTP\nТег: OTP\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "token": {
          "description": "query параметр \"token\""
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "token"
      ]
    }
  },
  {
    "name": "user_otp_setup_post",
    "method": "POST",
    "path": "/user/otp/setup",
    "spec": "user",
    "tag": "OTP",
    "summary": "Настройка OTP",
    "description": "POST /user/otp/setup\nНастройка OTP\nТег: OTP\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {},
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_passkey_get",
    "method": "GET",
    "path": "/user/passkey",
    "spec": "user",
    "tag": "Passkey Настройки",
    "summary": "Список зарегистрированных Passkey",
    "description": "GET /user/passkey\nСписок зарегистрированных Passkey\nТег: Passkey Настройки\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_passkey_post",
    "method": "POST",
    "path": "/user/passkey",
    "spec": "user",
    "tag": "Passkey Настройки",
    "summary": "Переименовать зарегистрированный Passkey по идентификатору",
    "description": "POST /user/passkey\nПереименовать зарегистрированный Passkey по идентификатору\nТег: Passkey Настройки\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "credential_id": {},
            "name": {}
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_passkey_delete",
    "method": "DELETE",
    "path": "/user/passkey",
    "spec": "user",
    "tag": "Passkey Настройки",
    "summary": "Удалить зарегистрированный Passkey по идентификатору",
    "description": "DELETE /user/passkey\nУдалить зарегистрированный Passkey по идентификатору\nТег: Passkey Настройки\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "credential_id": {
          "description": "query параметр \"credential_id\""
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "credential_id"
      ]
    }
  },
  {
    "name": "user_passkey_register_get",
    "method": "GET",
    "path": "/user/passkey/register",
    "spec": "user",
    "tag": "Passkey Регистрация",
    "summary": "Получить параметры регистрации Passkey",
    "description": "GET /user/passkey/register\nПолучить параметры регистрации Passkey\nТег: Passkey Регистрация\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_passkey_register_post",
    "method": "POST",
    "path": "/user/passkey/register",
    "spec": "user",
    "tag": "Passkey Регистрация",
    "summary": "Завершить регистрацию Passkey",
    "description": "POST /user/passkey/register\nЗавершить регистрацию Passkey\nТег: Passkey Регистрация\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "credential_id": {},
            "response": {}
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_passwd_post",
    "method": "POST",
    "path": "/user/passwd",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Сменить пароль пользователя",
    "description": "POST /user/passwd\nСменить пароль пользователя\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "password": {
              "description": "пароль в зашифровнном виде",
              "title": "пароль",
              "type": "string"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_passwd_reset_post",
    "method": "POST",
    "path": "/user/passwd/reset",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Запрос на сброс пароля пользователя",
    "description": "POST /user/passwd/reset\nЗапрос на сброс пароля пользователя\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "balance": {
              "default": 0,
              "title": "баланс",
              "type": "number"
            },
            "bonus": {
              "default": 0,
              "title": "бонусы",
              "type": "number"
            },
            "created": {
              "format": "date",
              "title": "дата создания"
            },
            "credit": {
              "default": 0,
              "title": "сумма кредита",
              "type": "number"
            },
            "discount": {
              "default": 0,
              "title": "персональная скидка",
              "type": "number"
            },
            "dogovor": {
              "title": "договор",
              "type": "string"
            },
            "full_name": {
              "description": "произвольное значение",
              "title": "наименование клиента",
              "type": "string"
            },
            "last_login": {
              "format": "date",
              "title": "дата последнего входа"
            },
            "login": {
              "title": "логин",
              "type": "string"
            },
            "login2": {
              "default": null,
              "title": "логин (дополнительный)",
              "type": "string"
            },
            "phone": {
              "title": "номер телефона",
              "type": "string"
            },
            "user_id": {
              "readOnly": true,
              "title": "id пользователя",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_passwd_reset_verify_get",
    "method": "GET",
    "path": "/user/passwd/reset/verify",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Проверка токена сброса пароля пользователя перед сменой пароля",
    "description": "GET /user/passwd/reset/verify\nПроверка токена сброса пароля пользователя перед сменой пароля\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "token": {
          "description": "query параметр \"token\""
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      },
      "required": [
        "token"
      ]
    }
  },
  {
    "name": "user_passwd_reset_verify_post",
    "method": "POST",
    "path": "/user/passwd/reset/verify",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Сменить пароль пользователя по токену сброса",
    "description": "POST /user/passwd/reset/verify\nСменить пароль пользователя по токену сброса\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "password": {
              "description": "пароль в зашифровнном виде",
              "title": "пароль",
              "type": "string"
            },
            "token": {}
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_password_auth_get",
    "method": "GET",
    "path": "/user/password-auth",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Статус входа по паролю",
    "description": "GET /user/password-auth\nСтатус входа по паролю\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_password_auth_post",
    "method": "POST",
    "path": "/user/password-auth",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Включить вход по паролю",
    "description": "POST /user/password-auth\nВключить вход по паролю\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "balance": {
              "default": 0,
              "title": "баланс",
              "type": "number"
            },
            "bonus": {
              "default": 0,
              "title": "бонусы",
              "type": "number"
            },
            "created": {
              "format": "date",
              "title": "дата создания"
            },
            "credit": {
              "default": 0,
              "title": "сумма кредита",
              "type": "number"
            },
            "discount": {
              "default": 0,
              "title": "персональная скидка",
              "type": "number"
            },
            "dogovor": {
              "title": "договор",
              "type": "string"
            },
            "full_name": {
              "description": "произвольное значение",
              "title": "наименование клиента",
              "type": "string"
            },
            "last_login": {
              "format": "date",
              "title": "дата последнего входа"
            },
            "login": {
              "title": "логин",
              "type": "string"
            },
            "login2": {
              "default": null,
              "title": "логин (дополнительный)",
              "type": "string"
            },
            "phone": {
              "title": "номер телефона",
              "type": "string"
            },
            "user_id": {
              "readOnly": true,
              "title": "id пользователя",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_password_auth_delete",
    "method": "DELETE",
    "path": "/user/password-auth",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Отключить вход по паролю",
    "description": "DELETE /user/password-auth\nОтключить вход по паролю\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_pay_get",
    "method": "GET",
    "path": "/user/pay",
    "spec": "user",
    "tag": "Платежи",
    "summary": "Список платежей пользователя",
    "description": "GET /user/pay\nСписок платежей пользователя\nТег: Платежи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_pay_forecast_get",
    "method": "GET",
    "path": "/user/pay/forecast",
    "spec": "user",
    "tag": "Платежи",
    "summary": "Прогноз оплаты",
    "description": "GET /user/pay/forecast\nПрогноз оплаты\nТег: Платежи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_pay_paysystems_get",
    "method": "GET",
    "path": "/user/pay/paysystems",
    "spec": "user",
    "tag": "Платежи",
    "summary": "Платежные системы",
    "description": "GET /user/pay/paysystems\nПлатежные системы\nТег: Платежи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_referrals_get",
    "method": "GET",
    "path": "/user/referrals",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Получение количества рефералов",
    "description": "GET /user/referrals\nПолучение количества рефералов\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_user_service_get",
    "method": "GET",
    "path": "/user/service",
    "spec": "user",
    "tag": "Услуги пользователей",
    "summary": "Список услуг пользователя",
    "description": "GET /user/service\nСписок услуг пользователя\nТег: Услуги пользователей\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_service_id": {
          "type": "number",
          "description": "id услуги пользоватея"
        },
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  },
  {
    "name": "user_service_delete",
    "method": "DELETE",
    "path": "/user/service",
    "spec": "user",
    "tag": "Услуги пользователей",
    "summary": "Удалить услугу пользователя",
    "description": "DELETE /user/service\nУдалить услугу пользователя\nТег: Услуги пользователей\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_service_id": {
          "type": "number",
          "description": "id услуги пользоватея"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      },
      "required": [
        "user_service_id"
      ]
    }
  },
  {
    "name": "user_service_change_post",
    "method": "POST",
    "path": "/user/service/change",
    "spec": "user",
    "tag": "Услуги пользователей",
    "summary": "Сменить тариф",
    "description": "POST /user/service/change\nСменить тариф\nТег: Услуги пользователей\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "service_id": {
              "title": "id услуги",
              "type": "number"
            },
            "user_service_id": {
              "title": "id услуги пользоватея",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_service_stop_post",
    "method": "POST",
    "path": "/user/service/stop",
    "spec": "user",
    "tag": "Услуги пользователей",
    "summary": "Остановить услугу пользователя",
    "description": "POST /user/service/stop\nОстановить услугу пользователя\nТег: Услуги пользователей\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "properties": {
            "user_service_id": {
              "title": "id услуги пользоватея",
              "type": "number"
            }
          },
          "type": "object",
          "description": "Тело запроса (application/json)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        },
        "confirm": {
          "type": "boolean",
          "description": "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
        }
      }
    }
  },
  {
    "name": "user_withdraw_get",
    "method": "GET",
    "path": "/user/withdraw",
    "spec": "user",
    "tag": "Пользователи",
    "summary": "Списания средств",
    "description": "GET /user/withdraw\nСписания средств\nТег: Пользователи\nСпека: user",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "default": 25,
          "minimum": 0,
          "type": "integer",
          "description": "Макс. кол-во записей"
        },
        "offset": {
          "default": 0,
          "minimum": 0,
          "type": "integer",
          "description": "Смещение (пропуск записей)"
        },
        "user_id": {
          "type": "integer",
          "description": "admin acts on behalf of this user"
        }
      }
    }
  }
];
