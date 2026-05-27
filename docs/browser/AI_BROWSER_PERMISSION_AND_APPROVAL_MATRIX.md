# AI BROWSER PERMISSION AND APPROVAL MATRIX

| Class | Examples | Approval |
|---|---|---|
| Read | Read page, inbox, analytics | Optional/light |
| Draft | Draft post, reply | Not required |
| Prepare | Fill form, upload | Preview |
| Publish | Post, email, DM | Required |
| Delete | Delete content | Always required |
| Pay | Ads, purchase | Critical approval |
| Security | Password, 2FA, admin | Forbidden/admin quorum |
| Legal | Contract, legal form | Required |

## Default LinkedIn policy

```json
{
  "platform": "linkedin",
  "allowedActions": {
    "read_feed": true,
    "draft_post": true,
    "upload_media": true,
    "publish_post": "approval_required",
    "send_message": "approval_required",
    "connect_people": false,
    "mass_message": false,
    "change_security_settings": "critical_approval"
  }
}
```

## Default Facebook policy

```json
{
  "platform": "facebook",
  "allowedActions": {
    "draft_profile_post": true,
    "publish_profile_post": "approval_required",
    "publish_page_post": "approval_required",
    "reply_comment": "approval_required",
    "send_dm": "approval_required",
    "join_group": false,
    "mass_comment": false,
    "ads_spend": "critical_approval"
  }
}
```
