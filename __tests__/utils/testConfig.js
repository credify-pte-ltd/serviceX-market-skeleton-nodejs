const TestConfig = {
  TEST_USER_ID: "2", // whatever is OK as long as it exists.
  TEST_CREDIFY_ID: "ba3d1f1a-57eb-4fc2-a6aa-dfaf4a359512",
  CUSTOM_SCOPE: "40f9a736-0d97-409b-a0f7-d23ebca20bde:loyalty-point-data-1653892708",
  CONDITIONS: [
    {
      "kind": "AND_CONDITION",
      "subconditions": [
        {
          "kind": "CONTAIN_CONDITION",
          "value": "gold",
          "claim": {
            "id": "2ef67c8c-dfe3-11ec-b302-06fb3df444b6",
            "scope_id": "2ef31d94-dfe3-11ec-b302-06fb3df444b6",
            "main_claim_id": "",
            "scope": {
              "id": "2ef31d94-dfe3-11ec-b302-06fb3df444b6",
              "provider_id": "40f9a736-0d97-409b-a0f7-d23ebca20bde",
              "name": "40f9a736-0d97-409b-a0f7-d23ebca20bde:loyalty-point-data-1653892708",
              "display_name": "Loyalty point data",
              "description": "",
              "price": {
                "value": "0.00",
                "currency": "VND"
              },
              "is_onetime_charge": false,
              "is_active": true,
              "created_at": "2022-05-30T06:38:57.990116Z",
              "updated_at": "2022-05-30T12:40:52.586952Z",
              "provider": null
            },
            "name": "40f9a736-0d97-409b-a0f7-d23ebca20bde:tier-1653892708",
            "display_name": "tier",
            "description": "",
            "value_type": "TEXT",
            "min_value": null,
            "max_value": null,
            "is_active": true,
            "created_at": "2022-05-30T06:38:58.012007Z",
            "updated_at": "2022-05-30T12:40:52.59158Z",
            "nested": null
          },
          "provider_id": "40f9a736-0d97-409b-a0f7-d23ebca20bde"
        },
        {
          "kind": "IN_RANGE_CONDITION",
          "value": 0,
          "upper": 10000,
          "claim": {
            "id": "2efc540e-dfe3-11ec-b302-06fb3df444b6",
            "scope_id": "2ef31d94-dfe3-11ec-b302-06fb3df444b6",
            "main_claim_id": "",
            "scope": {
              "id": "2ef31d94-dfe3-11ec-b302-06fb3df444b6",
              "provider_id": "40f9a736-0d97-409b-a0f7-d23ebca20bde",
              "name": "40f9a736-0d97-409b-a0f7-d23ebca20bde:loyalty-point-data-1653892708",
              "display_name": "Loyalty point data",
              "description": "",
              "price": {
                "value": "0.00",
                "currency": "VND"
              },
              "is_onetime_charge": false,
              "is_active": true,
              "created_at": "2022-05-30T06:38:57.990116Z",
              "updated_at": "2022-05-30T12:40:52.586952Z",
              "provider": null
            },
            "name": "40f9a736-0d97-409b-a0f7-d23ebca20bde:amount-1653892708",
            "display_name": "amount",
            "description": "",
            "value_type": "INTEGER",
            "min_value": 0,
            "max_value": 10000,
            "is_active": true,
            "created_at": "2022-05-30T06:38:58.050245Z",
            "updated_at": "2022-05-30T12:40:52.596392Z",
            "nested": null
          },
          "provider_id": "40f9a736-0d97-409b-a0f7-d23ebca20bde"
        }
      ],
      "provider_id": "40f9a736-0d97-409b-a0f7-d23ebca20bde"
    }
  ],
  OFFERS: [
    {
      "code": "test-offer-skeleton-test-org-1653990197",
      "campaign": {
        "consumer": {
          "id": "8e0b198b-f112-4612-96bb-9d2c8b8ca0c3",
          "name": "Pentest Service Provider",
          "description": "",
          "app_url": "https://credify.one",
          "logo_url": "",
          "scopes": [
            "profile",
            "phone",
            "openid"
          ]
        },
        "name": "Test offer",
        "description": "Test description",
        "start_date": null,
        "end_date": null,
        "levels": [
          "test"
        ],
        "thumbnail_url": "https://credify.one",
        "published": true
      },
      "conditions": [
        {
          "kind": "AND_CONDITION",
          "subconditions": [
            {
              "kind": "CONTAIN_CONDITION",
              "value": "gold",
              "claim": {
                "id": "2ef67c8c-dfe3-11ec-b302-06fb3df444b6",
                "scope_id": "2ef31d94-dfe3-11ec-b302-06fb3df444b6",
                "main_claim_id": "",
                "scope": {
                  "id": "2ef31d94-dfe3-11ec-b302-06fb3df444b6",
                  "provider_id": "40f9a736-0d97-409b-a0f7-d23ebca20bde",
                  "name": "40f9a736-0d97-409b-a0f7-d23ebca20bde:loyalty-point-data-1653892708",
                  "display_name": "Loyalty point data",
                  "description": "",
                  "price": {
                    "value": "0.00",
                    "currency": "VND"
                  },
                  "is_onetime_charge": false,
                  "is_active": true,
                  "created_at": "2022-05-30T06:38:57.990116Z",
                  "updated_at": "2022-05-30T12:40:52.586952Z",
                  "provider": null
                },
                "name": "40f9a736-0d97-409b-a0f7-d23ebca20bde:tier-1653892708",
                "display_name": "tier",
                "description": "",
                "value_type": "TEXT",
                "min_value": null,
                "max_value": null,
                "is_active": true,
                "created_at": "2022-05-30T06:38:58.012007Z",
                "updated_at": "2022-05-30T12:40:52.59158Z",
                "nested": null
              },
              "provider_id": "40f9a736-0d97-409b-a0f7-d23ebca20bde"
            },
            {
              "kind": "IN_RANGE_CONDITION",
              "value": 0,
              "upper": 10000,
              "claim": {
                "id": "2efc540e-dfe3-11ec-b302-06fb3df444b6",
                "scope_id": "2ef31d94-dfe3-11ec-b302-06fb3df444b6",
                "main_claim_id": "",
                "scope": {
                  "id": "2ef31d94-dfe3-11ec-b302-06fb3df444b6",
                  "provider_id": "40f9a736-0d97-409b-a0f7-d23ebca20bde",
                  "name": "40f9a736-0d97-409b-a0f7-d23ebca20bde:loyalty-point-data-1653892708",
                  "display_name": "Loyalty point data",
                  "description": "",
                  "price": {
                    "value": "0.00",
                    "currency": "VND"
                  },
                  "is_onetime_charge": false,
                  "is_active": true,
                  "created_at": "2022-05-30T06:38:57.990116Z",
                  "updated_at": "2022-05-30T12:40:52.586952Z",
                  "provider": null
                },
                "name": "40f9a736-0d97-409b-a0f7-d23ebca20bde:amount-1653892708",
                "display_name": "amount",
                "description": "",
                "value_type": "INTEGER",
                "min_value": 0,
                "max_value": 10000,
                "is_active": true,
                "created_at": "2022-05-30T06:38:58.050245Z",
                "updated_at": "2022-05-30T12:40:52.596392Z",
                "nested": null
              },
              "provider_id": "40f9a736-0d97-409b-a0f7-d23ebca20bde"
            }
          ],
          "provider_id": "40f9a736-0d97-409b-a0f7-d23ebca20bde"
        }
      ]
    }
  ]
}

module.exports = TestConfig;
