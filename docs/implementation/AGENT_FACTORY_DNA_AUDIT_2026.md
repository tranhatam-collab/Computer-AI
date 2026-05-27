# Agent Factory DNA Blueprint — Computer.iai.one
## Bộ DNA Kỹ Thuật & Audit 100 Mẫu từ Awesome-LLM-Apps → ACO Super Apps

**Version:** 1.0.0  
**Date:** 2026-05-27  
**Author:** Computer.iai.one Architecture Team  
**Scope:** Chuyển toàn bộ mẫu AI Agent từ `awesome-llm-apps` thành các Super App trong hệ sinh thái ACO (AI Computer Operating System) của IAI.One  
**License Base:** Apache-2.0 (source templates) → Chuẩn hóa & Rebranded cho Computer.iai.one

---

## 1. Tóm tắt chiến lược

### Mục tiêu
- **Rút ngắn 6–12 tháng thử nghiệm agent** bằng cách tái sử dụng 100+ mẫu đã chạy được.
- **Mọi agent đưa vào ACO phải qua lớp chuẩn hóa:** identity, payment, permission, memory, vault, audit, cost governor, verification, deployment.
- **Không để mỗi app gọi API riêng** — tất cả agent gọi qua `AiAgent.iai.one` unified API gateway.
- **Agent Factory = manufacturing line:** mỗi agent có manifest, tool permissions, cost limit, memory scope, audit log, UI card.

### Nguyên tắc đổi tên & tránh vi phạm thương hiệu
| Rủi ro | Tên gốc | Tên ACO mới | Lý do đổi |
|---|---|---|---|
| 🔴 Cao | `openai_research_agent` | `ai_research_agent` | OpenAI® trademark |
| 🔴 Cao | `google_adk_crash_course` | `agent_framework_crash_course` | Google® / ADK trademark |
| 🔴 Cao | `gemini_agentic_rag` | `multimodal_agentic_rag` | Gemini® trademark (Google) |
| 🔴 Cao | `xai_finance_agent` | `ai_finance_analyst` | xAI® trademark (Elon Musk/X Corp) |
| 🟡 Trung bình | `llama3.1_local_rag` | `local_llm_rag_agent` | Llama® trademark (Meta) — có thể dùng vì open-source nhưng nên tránh |
| 🟡 Trung bình | `qwen_local_rag` | `local_multilingual_rag` | Qwen® trademark (Alibaba) |
| 🟡 Trung bình | `cohere_rag_agent` | `enterprise_rag_agent` | Cohere® trademark |
| 🟡 Trung bình | `deepseek_local_rag_agent` | `local_reasoning_rag` | DeepSeek® trademark |
| 🟡 Trung bình | `notion_mcp_agent` | `knowledge_base_mcp_agent` | Notion® trademark |
| 🟡 Trung bình | `github_mcp_agent` | `code_repository_mcp_agent` | GitHub® trademark |
| 🟢 Thấp | `browser_mcp_agent` | `web_automation_agent` | Browser = generic term |
| 🟢 Thấp | `ai_travel_agent` | `travel_planner_agent` | Generic descriptive |

> **Quy tắc vàng:** Không để tên công ty/model AI nằm trong tên sản phẩm cuối. Agent là của Computer.iai.one, không phải "OpenAI Agent" hay "Gemini Agent".

---

## 2. Bảng audit & chấm điểm toàn bộ mẫu

### Hệ thống chấm điểm (thang 10)
- **BV (Business Value):** Khả năng monetize, nhu cầu thị trường, tính độc đáo
- **DI (Difficulty/Integration):** Độ phức tạp khi đưa vào ACO (1 = dễ, 10 = cực khó)
- **FIT (Fit for ACO):** Mức độ phù hợp với kiến trúc & roadmap Computer.iai.one
- **Tổng điểm = (BV × 2 + FIT × 3) / DI** — ưu tiên giá trị cao, fit cao, độ khó thấp

### 2.1 Starter AI Agents (15 mẫu)

| # | Tên gốc | Tên ACO | BV | DI | FIT | Score | Chọn? | Ghi chú |
|---|---------|---------|----|----|-----|-------|-------|---------|
| 1 | `ai_travel_agent` | `travel_planner_agent` | 8 | 4 | 9 | **9.8** | ✅ | Có Smart Calendar integration sẵn |
| 2 | `ai_blog_to_podcast_agent` | `content_transmute_agent` | 7 | 3 | 7 | **9.3** | ✅ | Tạo podcast từ blog — content pipeline |
| 3 | `ai_data_analysis_agent` | `data_insight_agent` | 9 | 5 | 9 | **9.0** | ✅ | Core business tool, high demand |
| 4 | `ai_data_visualisation_agent` | `visual_analytics_agent` | 8 | 4 | 8 | **9.0** | ✅ | Tích hợp với data pipeline |
| 5 | `ai_startup_trend_analysis_agent` | `market_intelligence_agent` | 7 | 5 | 8 | **7.6** | ✅ | Dành cho startup/enterprise users |
| 6 | `ai_reasoning_agent` | `cognitive_reasoning_agent` | 6 | 4 | 9 | **8.3** | ✅ | Foundation cho nhiều agent khác |
| 7 | `web_scraping_ai_agent` | `web_harvest_agent` | 7 | 4 | 8 | **8.3** | ✅ | Browser integration sẵn có |
| 8 | `ai_life_insurance_advisor_agent` | `insurance_advisor_agent` | 7 | 5 | 7 | **7.0** | ✅ | Vertical fintech |
| 9 | `ai_medical_imaging_agent` | `medical_vision_agent` | 8 | 7 | 7 | **6.1** | ⚠️ | Cần HIPAA/compliance audit |
| 10 | `ai_meme_generator_agent_browseruse` | `creative_content_agent` | 5 | 3 | 5 | **6.7** | ❌ | Giá trị thấp, không core |
| 11 | `ai_music_generator_agent` | `audio_compose_agent` | 6 | 6 | 6 | **5.0** | ❌ | Cần infra âm thanh riêng |
| 12 | `ai_breakup_recovery_agent` | `wellness_coach_agent` | 5 | 3 | 5 | **6.7** | ❌ | Quá niche |
| 13 | `mixture_of_agents` | `ensemble_orchestrator_agent` | 9 | 8 | 10 | **6.6** | ✅ | Core architecture pattern |
| 14 | `multimodal_ai_agent` | `multimodal_fusion_agent` | 8 | 7 | 9 | **6.4** | ✅ | Vision + text + audio |
| 15 | `openai_research_agent` | `ai_research_agent` | 7 | 5 | 7 | **7.0** | ✅ | Đổi tên, dùng được ngay |
| 16 | `xai_finance_agent` | `ai_finance_analyst` | 7 | 5 | 7 | **7.0** | ✅ | Đổi tên, fintech vertical |

### 2.2 Advanced AI Agents

#### Single Agent Apps
| # | Tên gốc | Tên ACO | BV | DI | FIT | Score | Chọn? | Ghi chú |
|---|---------|---------|----|----|-----|-------|-------|---------|
| 1 | `ai_deep_research_agent` | `deep_research_agent` | 9 | 7 | 9 | **6.4** | ✅ | Perplexity-style research |
| 2 | `ai_journalist_agent` | `news_compose_agent` | 7 | 5 | 6 | **6.0** | ⚠️ | Có thể integrate sau |
| 3 | `ai_email_gtm_reachout_agent` | `outreach_automation_agent` | 8 | 5 | 7 | **6.6** | ✅ | Sales/GTM tool |
| 4 | `ai_system_architect_r1` | `system_design_agent` | 7 | 6 | 8 | **6.2** | ✅ | Dev tool |
| 5 | `ai_meeting_agent` | `meeting_intelligence_agent` | 8 | 6 | 9 | **6.8** | ✅ | Tích hợp Smart Calendar |
| 6 | `autonomous_game_playing_agent_apps` | `game_simulation_agent` | 5 | 7 | 4 | **3.7** | ❌ | Không core |

#### Multi Agent Apps
| # | Tên gốc | Tên ACO | BV | DI | FIT | Score | Chọn? | Ghi chú |
|---|---------|---------|----|----|-----|-------|-------|---------|
| 1 | `ai_startup_insight_fire1_agent` | `startup_command_center_agent` | 8 | 8 | 9 | **5.6** | ✅ | Multi-agent team cho startup |
| 2 | Various multi-agent patterns | `agent_team_orchestrator` | 9 | 9 | 10 | **5.2** | ✅ | Core infrastructure |

### 2.3 Advanced LLM Apps

| # | Tên gốc | Tên ACO | BV | DI | FIT | Score | Chọn? | Ghi chú |
|---|---------|---------|----|----|-----|-------|-------|---------|
| 1 | `llm_optimization_tools` | `llm_tuning_agent` | 7 | 8 | 7 | **4.4** | ⚠️ | Quá technical, dev-only |
| 2 | `multimodal_video_moment_finder` | `video_insight_agent` | 7 | 7 | 7 | **5.0** | ⚠️ | Cần GPU infra |
| 3 | `resume_job_matcher` | `talent_match_agent` | 8 | 5 | 7 | **7.0** | ✅ | HR tech vertical |
| 4 | `thinkpath_chatbot_app` | `conversational_reasoning_agent` | 6 | 5 | 7 | **6.6** | ✅ | Chatbot với reasoning |

### 2.4 MCP AI Agents (7 mẫu)

| # | Tên gốc | Tên ACO | BV | DI | FIT | Score | Chọn? | Ghi chú |
|---|---------|---------|----|----|-----|-------|-------|---------|
| 1 | `ai_travel_planner_mcp_agent_team` | `mcp_travel_orchestrator` | 8 | 6 | 9 | **6.8** | ✅ | MCP + multi-agent |
| 2 | `browser_mcp_agent` | `web_automation_agent` | 9 | 5 | 9 | **9.0** | ✅ | Core — AI Browser integration |
| 3 | `github_mcp_agent` | `code_repository_mcp_agent` | 7 | 5 | 7 | **7.0** | ✅ | Đổi tên, dev tool |
| 4 | `multi_mcp_agent` | `universal_mcp_connector` | 9 | 6 | 10 | **7.5** | ✅ | Core infrastructure |
| 5 | `multi_mcp_agent_router` | `mcp_intelligent_router` | 9 | 7 | 10 | **6.4** | ✅ | MCP routing layer |
| 6 | `notion_mcp_agent` | `knowledge_base_mcp_agent` | 6 | 4 | 6 | **7.5** | ⚠️ | Đổi tên, KB integration |

### 2.5 RAG Tutorials (25 mẫu)

| # | Pattern | Tên ACO | BV | DI | FIT | Score | Chọn? | Ghi chú |
|---|---------|---------|----|----|-----|-------|-------|---------|
| 1 | `agentic_rag_with_reasoning` | `reasoning_rag_engine` | 8 | 6 | 9 | **6.8** | ✅ | Core RAG pattern |
| 2 | `autonomous_rag` | `self_healing_rag_engine` | 9 | 7 | 9 | **6.4** | ✅ | Tự sửa lỗi RAG |
| 3 | `corrective_rag` | `feedback_loop_rag_engine` | 8 | 6 | 8 | **6.7** | ✅ | RAG với correction |
| 4 | `hybrid_search_rag` | `hybrid_retrieval_engine` | 8 | 5 | 9 | **8.0** | ✅ | Keyword + semantic |
| 5 | `knowledge_graph_rag` | `knowledge_graph_rag_engine` | 9 | 8 | 9 | **5.6** | ✅ | Graph RAG |
| 6 | `multimodal_agentic_rag` | `multimodal_rag_engine` | 8 | 7 | 9 | **6.1** | ✅ | Image + text RAG |
| 7 | `rag_database_routing` | `dynamic_db_rag_router` | 7 | 6 | 8 | **6.3** | ✅ | Route queries đến DB phù hợp |
| 8 | `rag_failure_diagnostics_clinic` | `rag_health_monitor` | 7 | 5 | 8 | **7.0** | ✅ | Observability cho RAG |
| 9 | `vision_rag` | `visual_rag_engine` | 7 | 6 | 7 | **5.8** | ⚠️ | Cần vision model |
| 10 | `rag_as_a_service` | `rag_api_gateway` | 9 | 6 | 10 | **7.5** | ✅ | Wrap RAG thành service |
| 11 | `local_rag_agent` | `private_rag_engine` | 7 | 5 | 8 | **7.6** | ✅ | On-premise RAG |
| 12 | `deepseek_local_rag_agent` | `local_reasoning_rag` | 7 | 6 | 7 | **5.8** | ✅ | Đổi tên |
| 13 | `llama3.1_local_rag` | `local_llm_rag_agent` | 6 | 5 | 7 | **6.6** | ⚠️ | Đổi tên |
| 14 | `qwen_local_rag` | `local_multilingual_rag` | 6 | 5 | 7 | **6.6** | ⚠️ | Đổi tên |
| 15 | Various embedding variants | `embedding_factory` | 7 | 4 | 8 | **8.1** | ✅ | Abstract embedding layer |

### 2.6 Voice AI Agents (5 mẫu)

| # | Tên gốc | Tên ACO | BV | DI | FIT | Score | Chọn? | Ghi chú |
|---|---------|---------|----|----|-----|-------|-------|---------|
| 1 | `ai_audio_tour_agent` | `audio_guide_agent` | 6 | 5 | 6 | **5.4** | ⚠️ | Tourism vertical |
| 2 | `customer_support_voice_agent` | `voice_support_agent` | 9 | 7 | 9 | **6.4** | ✅ | Core — support automation |
| 3 | `insurance_claim_live_agent_team` | `claims_processing_agent_team` | 8 | 8 | 8 | **5.0** | ✅ | Insurance vertical |
| 4 | `voice_rag_openaisdk` | `voice_knowledge_agent` | 7 | 7 | 8 | **5.4** | ✅ | Đổi tên, voice + RAG |

### 2.7 Awesome Agent Skills (22 mẫu)

| # | Tên gốc | Tên ACO Skill | BV | DI | FIT | Score | Chọn? | Ghi chú |
|---|---------|---------------|----|----|-----|-------|-------|---------|
| 1 | `academic-researcher` | `research_skill` | 7 | 3 | 8 | **9.3** | ✅ | Dùng trong nhiều agent |
| 2 | `code-reviewer` | `code_review_skill` | 8 | 3 | 8 | **9.3** | ✅ | Dev tool skill |
| 3 | `content-creator` | `content_compose_skill` | 7 | 3 | 7 | **8.7** | ✅ | Marketing skill |
| 4 | `data-analyst` | `data_analysis_skill` | 8 | 4 | 8 | **8.0** | ✅ | Core skill |
| 5 | `debugger` | `debug_skill` | 7 | 4 | 8 | **7.5** | ✅ | Dev tool skill |
| 6 | `decision-helper` | `decision_support_skill` | 7 | 3 | 7 | **8.7** | ✅ | Business skill |
| 7 | `deep-research` | `deep_research_skill` | 8 | 5 | 9 | **7.8** | ✅ | Research skill |
| 8 | `editor` | `text_edit_skill` | 6 | 2 | 7 | **10.5** | ✅ | Cơ bản, dễ tích hợp |
| 9 | `email-drafter` | `email_compose_skill` | 6 | 2 | 7 | **10.5** | ✅ | Cơ bản |
| 10 | `fact-checker` | `fact_verify_skill` | 7 | 3 | 8 | **9.3** | ✅ | Verification layer |
| 11 | `fullstack-developer` | `fullstack_code_skill` | 8 | 6 | 8 | **5.3** | ⚠️ | Cần sandbox |
| 12 | `meeting-notes` | `meeting_summarize_skill` | 7 | 3 | 8 | **9.3** | ✅ | Tích hợp calendar |
| 13 | `project-planner` | `project_plan_skill` | 7 | 3 | 7 | **8.7** | ✅ | PM tool skill |
| 14 | `python-expert` | `python_code_skill` | 7 | 4 | 8 | **7.5** | ✅ | Dev skill |
| 15 | `self-improving-agent-skills` | `meta_learning_skill` | 9 | 9 | 9 | **4.0** | ✅ | Advanced — agent tự cải thiện |
| 16 | `sprint-planner` | `agile_plan_skill` | 6 | 3 | 6 | **7.0** | ⚠️ | Agile vertical |
| 17 | `strategy-advisor` | `strategy_consult_skill` | 7 | 4 | 7 | **6.9** | ✅ | Business skill |
| 18 | `technical-writer` | `tech_doc_skill` | 6 | 3 | 7 | **8.3** | ✅ | Doc skill |
| 19 | `ux-designer` | `ux_design_skill` | 6 | 4 | 6 | **6.0** | ⚠️ | Design vertical |
| 20 | `visualization-expert` | `data_viz_skill` | 7 | 4 | 7 | **6.9** | ✅ | Analytics skill |

### 2.8 Agent Framework Crash Course (2 mẫu)

| # | Tên gốc | Tên ACO | BV | DI | FIT | Score | Chọn? | Ghi chú |
|---|---------|---------|----|----|-----|-------|-------|---------|
| 1 | `google_adk_crash_course` | `agent_framework_crash_course` | 5 | 3 | 5 | **6.7** | ❌ | Tutorial, không phải product |
| 2 | `openai_sdk_crash_course` | `llm_sdk_crash_course` | 5 | 3 | 5 | **6.7** | ❌ | Tutorial |

---

## 3. Danh sách "Super Apps ACO" đã chọn

Tổng cộng **~40 agent/skill** được chọn chuyển thành Super Apps trong ACO.

### Tier 1 — Core Infrastructure (Đưa vào trước tiên)
1. `ensemble_orchestrator_agent` — Multi-agent orchestration
2. `agent_team_orchestrator` — Team management
3. `universal_mcp_connector` — MCP integration hub
4. `mcp_intelligent_router` — MCP routing
5. `reasoning_rag_engine` — Core RAG
6. `hybrid_retrieval_engine` — Hybrid search
7. `knowledge_graph_rag_engine` — Graph RAG
8. `rag_api_gateway` — RAG as Service
9. `web_automation_agent` — Browser automation (MCP)
10. `cognitive_reasoning_agent` — Reasoning foundation

### Tier 2 — Business Verticals (Đưa vào sau Tier 1)
11. `travel_planner_agent` — Travel + Calendar
12. `data_insight_agent` — Data analysis
13. `visual_analytics_agent` — Data viz
14. `market_intelligence_agent` — Startup/enterprise intel
15. `outreach_automation_agent` — Sales/GTM
16. `system_design_agent` — Dev tool
17. `meeting_intelligence_agent` — Meeting + Calendar
18. `startup_command_center_agent` — Startup multi-agent
19. `insurance_advisor_agent` — Fintech
20. `ai_finance_analyst` — Finance
21. `talent_match_agent` — HR tech
22. `voice_support_agent` — Customer support
23. `claims_processing_agent_team` — Insurance processing

### Tier 3 — Skills & Engines (Reusable components)
24. `research_skill`
25. `code_review_skill`
26. `content_compose_skill`
27. `data_analysis_skill`
28. `debug_skill`
29. `decision_support_skill`
30. `deep_research_skill`
31. `text_edit_skill`
32. `email_compose_skill`
33. `fact_verify_skill`
34. `meeting_summarize_skill`
35. `project_plan_skill`
36. `python_code_skill`
37. `meta_learning_skill`
38. `strategy_consult_skill`
39. `tech_doc_skill`
40. `data_viz_skill`

---

## 4. Kiến trúc Agent Factory

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Agent Factory (ACO)                             │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │   Identity   │  │  Permission  │  │  Cost Gov    │  │   Vault    │ │
│  │   Service    │  │   Service    │  │  (governor)  │  │  Service   │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘ │
│         │                 │                 │                │        │
│  ┌──────┴─────────────────┴─────────────────┴────────────────┴──────┐  │
│  │                    Unified API Gateway                           │  │
│  │                      AiAgent.iai.one                             │  │
│  └──────┬─────────────────┬─────────────────┬────────────────┬──────┘  │
│         │                 │                 │                │        │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐  ┌────▼─────┐  │
│  │  Agent      │  │  Agent      │  │  Agent      │  │  Agent    │  │
│  │  Manifest   │  │  Manifest   │  │  Manifest   │  │  Manifest │  │
│  │  Registry   │  │  Registry   │  │  Registry   │  │  Registry │  │
│  │             │  │             │  │             │  │           │  │
│  │ • travel    │  │ • data      │  │ • research  │  │ • voice   │  │
│  │ • finance   │  │ • visual    │  │ • code      │  │ • support │  │
│  │ • meeting   │  │ • market    │  │ • fact      │  │ • claims  │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └───────────┘  │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Tool Execution Layer                        │  │
│  │  (MCP Servers · Browser Use · File System · APIs · Database) │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Memory & Audit Layer                        │  │
│  │  (Short-term / Long-term / Vector DB / Audit Log / Cost Log) │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Agent Manifest Schema (JSON)

Mỗi agent khi đăng ký vào Agent Factory phải có manifest chuẩn:

```json
{
  "agent_id": "travel_planner_agent",
  "version": "1.0.0",
  "name": "Travel Planner Agent",
  "description": "Plan trips, book flights, create itineraries with Smart Calendar integration",
  "category": "lifestyle",
  "tier": 2,
  "author": "computer.iai.one",
  "license": "MIT",
  "api_endpoint": "https://aiagent.iai.one/v1/agents/travel_planner",
  "identity": {
    "agent_uuid": "agent://travel-planner-001",
    "owner_user_id": null,
    "scope": "user" 
  },
  "permissions": {
    "tools": ["serpapi", "calendar", "browser", "email"],
    "data_access": ["user_profile", "calendar_events"],
    "max_file_size_mb": 10,
    "allowed_hosts": ["*.google.com", "*.booking.com"]
  },
  "cost_limits": {
    "max_tokens_per_run": 100000,
    "max_cost_usd_per_run": 2.00,
    "max_cost_usd_per_day": 20.00,
    "model_tier": "standard"
  },
  "memory": {
    "short_term_ttl_seconds": 3600,
    "long_term_enabled": true,
    "vector_db_collection": "travel_memories"
  },
  "audit": {
    "log_level": "full",
    "retain_days": 90,
    "pii_redaction": true
  },
  "ui": {
    "card_template": "travel_card_v2",
    "icon": "plane",
    "primary_color": "#3B82F6",
    "input_type": "text",
    "output_types": ["text", "calendar_event", "map"]
  },
  "dependencies": [
    "@iai/smart-calendar",
    "@iai/browser-automation",
    "@iai/routing-matrix"
  ],
  "status": "production"
}
```

---

## 6. Quy trình chuẩn hóa (5 bước)

### Bước 1: Tách logic khỏi UI
- **Input:** Code gốc (Python/Streamlit)
- **Output:** Core agent logic (TypeScript/Node.js) + UI card (React)
- **Rule:** Không để Streamlit, Gradio, hoặc framework UI bên thứ 3 trong core logic

### Bước 2: Thay thế framework-specific imports
- Agno → `@iai/agent-sdk`
- LangChain → `@iai/workflow-engine`
- OpenAI SDK → `@iai/providers` (unified AI provider)
- MCP SDK → `@iai/mcp-connector`

### Bước 3: Inject governance layer
- Thêm `identity` check trước mỗi run
- Thêm `permission` check cho mỗi tool call
- Thêm `cost_governor` hook vào mỗi LLM call
- Thêm `audit_log` write sau mỗi action

### Bước 4: Tích hợp Computer.iai.one services
- Memory: `@iai/memory-service`
- Vault: `@iai/vault-service`
- Calendar: `@iai/smart-calendar`
- Browser: `@iai/browser-automation`
- Payment: `@iai/payment-service` (nếu agent cần thanh toán)

### Bước 5: Đóng gói & Registry
- Tạo `manifest.json`
- Đăng ký vào Agent Registry (`/api/agents/registry`)
- Publish UI card vào App Store
- Kích hoạt cost tracking & monitoring

---

## 7. API Chuẩn hóa — AiAgent.iai.one

Tất cả agent gọi qua unified API. Không để agent gọi trực tiếp OpenAI, Anthropic, hay bất kỳ API bên ngoài nào.

### Base Endpoint
```
POST https://aiagent.iai.one/v1/agents/{agent_id}/run
Headers:
  Authorization: Bearer {user_token}
  X-Agent-Session: {session_id}
  X-Cost-Limit: 2.00
```

### Request Body
```json
{
  "input": "Plan a 3-day trip to Tokyo",
  "context": {
    "user_id": "user_123",
    "preferences": { "budget": "mid", "style": "cultural" },
    "session_memory": { ... }
  },
  "tools": ["browser", "calendar", "maps"],
  "options": {
    "stream": true,
    "timeout_seconds": 120
  }
}
```

### Response
```json
{
  "run_id": "run_abc123",
  "agent_id": "travel_planner_agent",
  "state": "completed",
  "output": {
    "text": "Here's your Tokyo itinerary...",
    "artifacts": [
      { "type": "calendar_event", "data": { ... } },
      { "type": "map_link", "url": "..." }
    ]
  },
  "cost": {
    "input_tokens": 450,
    "output_tokens": 1200,
    "model": "claude-sonnet-4",
    "usd": 0.84
  },
  "audit_log_id": "audit_456"
}
```

---

## 8. Roadmap tích hợp

### Sprint 1 (Tuần 1–2): Foundation
- [ ] Xây dựng Agent Manifest Schema v1
- [ ] Tạo Agent Registry API (`/api/agents/registry`)
- [ ] Tích hợp cost governor vào `@iai/providers`
- [ ] Chọn 5 Tier-1 agent để pilot

### Sprint 2 (Tuần 3–4): Core Agents
- [ ] Migrate `web_automation_agent` (Browser MCP)
- [ ] Migrate `reasoning_rag_engine` + `hybrid_retrieval_engine`
- [ ] Migrate `cognitive_reasoning_agent`
- [ ] Thêm memory scope vào tất cả agent

### Sprint 3 (Tuần 5–6): Business Verticals
- [ ] Migrate `travel_planner_agent` + `meeting_intelligence_agent`
- [ ] Migrate `data_insight_agent` + `visual_analytics_agent`
- [ ] Migrate `voice_support_agent`

### Sprint 4 (Tuần 7–8): Skills & Ecosystem
- [ ] Publish 20 Agent Skills vào Skill Marketplace
- [ ] Tích hợp `meta_learning_skill` (agent tự cải thiện)
- [ ] Mở Agent Store cho third-party developers

---

## 9. Kiểm soát rủi ro pháp lý

### Trademark Checklist
- [x] Không dùng "OpenAI", "ChatGPT", "GPT" trong tên sản phẩm
- [x] Không dùng "Gemini", "Google", "Bard" trong tên sản phẩm
- [x] Không dùng "Claude", "Anthropic" trong tên sản phẩm
- [x] Không dùng "Llama", "Meta AI" trong tên sản phẩm
- [x] Không dùng "xAI", "Grok" trong tên sản phẩm
- [x] Không dùng "Qwen", "Alibaba" trong tên sản phẩm
- [x] Không dùng "DeepSeek" trong tên sản phẩm
- [x] Không dùng "Notion", "GitHub" trong tên sản phẩm
- [x] Không dùng "Cohere" trong tên sản phẩm
- [x] Đổi tên các agent có chứa thương hiệu thành generic descriptive

### License Compliance
- Source templates: Apache-2.0 (cho phép commercial use, modification)
- Code ACO: Proprietary (Computer.iai.one)
- Khi publish: Giữ attribution trong `NOTICE` file nếu cần
- Không copy code có license incompatible (GPL, etc.)

---

## 10. Tổng kết

| Chỉ số | Số lượng |
|---|---|
| Tổng mẫu audit | ~75–80 |
| Chọn làm Super Apps | **40** |
| Cần đổi tên tránh trademark | **12** |
| Tier 1 (Core Infrastructure) | 10 |
| Tier 2 (Business Verticals) | 13 |
| Tier 3 (Reusable Skills) | 17 |
| Dự kiến sprint hoàn thành | 8 tuần |
| Ước tính tiết kiệm thời gian | **6–12 tháng** |

> **Lệnh dừng/xây:**  
> **Dừng:** Không thêm agent mới vào repo trước khi có manifest. Không để agent gọi API ngoài trực tiếp.  
> **Xây:** Mỗi agent phải qua Agent Factory với đầy đủ identity, permission, cost limit, audit log trước khi production.
