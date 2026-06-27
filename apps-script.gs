/**
 * Google Sheets → REST API via Apps Script.
 *
 * SETUP:
 *   1. Create a Google Sheet with 3 tabs: Profile, Projects, Admin
 *   2. Extensions → Apps Script → paste this file
 *   3. (Optional) Set TOKEN below to a secret string
 *   4. Deploy → New deployment → Type: Web app → Execute as: Me → Access: Anyone
 *   5. Copy the web app URL into your .env as APPS_SCRIPT_URL
 */

// ─── Optional: set a secret token so only your app can write ──
const TOKEN = "change-me-to-a-random-string";

// ─── DO NOT EDIT BELOW ──────────────────────────────────────

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    const params = e.parameter || {};
    const action = params.action;

    // Verify token on write operations
    if (["updateProfile", "saveProjects", "setAdminHash"].includes(action)) {
      if (TOKEN && params.token !== TOKEN) {
        return jsonResponse({ error: "Invalid token" });
      }
      // Parse POST body
      const body = JSON.parse(e.postData ? e.postData.contents : "{}");
      return jsonResponse({ data: handleAction(action, body) });
    }

    return jsonResponse({ data: handleAction(action, params) });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

function handleAction(action, payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  switch (action) {
    // ── Profile ──
    case "getProfile": {
      const sheet = ss.getSheetByName("Profile");
      if (!sheet) throw new Error('Tab "Profile" not found');
      const rows = sheet.getDataRange().getValues();
      const row = rows.find((r) => r[0] === "data");
      return row ? JSON.parse(row[1]) : null;
    }
    case "updateProfile": {
      const sheet = ss.getSheetByName("Profile");
      if (!sheet) throw new Error('Tab "Profile" not found');
      const rows = sheet.getDataRange().getValues();
      const existingRow = rows.find((r) => r[0] === "data");
      const existing = existingRow ? JSON.parse(existingRow[1]) : {};
      const merged = { ...existing, ...payload };
      // Clear sheet and rewrite
      sheet.clearContents();
      sheet.getRange("A1:B1").setValues([["key", "value"]]);
      sheet.getRange("A2:B2").setValues([["data", JSON.stringify(merged)]]);
      return { success: true };
    }

    // ── Projects ──
    case "getProjects": {
      const sheet = ss.getSheetByName("Projects");
      if (!sheet) throw new Error('Tab "Projects" not found');
      const rows = sheet.getDataRange().getValues();
      if (rows.length <= 1) return [];
      return rows.slice(1).map((r) => ({
        id: r[0] || "",
        title: r[1] || "",
        description: r[2] || "",
        technologies: r[3] ? JSON.parse(r[3]) : [],
        link: r[4] || undefined,
        createdAt: r[5] || "",
      }));
    }
    case "saveProjects": {
      const sheet = ss.getSheetByName("Projects");
      if (!sheet) throw new Error('Tab "Projects" not found');
      sheet.clearContents();
      const header = [["id", "title", "description", "technologies", "link", "createdAt"]];
      const rows = payload.map((p) => [
        p.id,
        p.title,
        p.description,
        JSON.stringify(p.technologies || []),
        p.link || "",
        p.createdAt,
      ]);
      sheet.getRange(1, 1, header.length, header[0].length).setValues(header);
      if (rows.length > 0) {
        sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
      }
      return { success: true };
    }

    // ── Admin ──
    case "getAdminHash": {
      const sheet = ss.getSheetByName("Admin");
      if (!sheet) throw new Error('Tab "Admin" not found');
      const rows = sheet.getDataRange().getValues();
      const row = rows.find((r) => r[0] === "password");
      return row ? row[1] : null;
    }
    case "setAdminHash": {
      const sheet = ss.getSheetByName("Admin");
      if (!sheet) throw new Error('Tab "Admin" not found');
      sheet.clearContents();
      sheet.getRange("A1:B1").setValues([["key", "value"]]);
      sheet.getRange("A2:B2").setValues([["password", payload]]);
      return { success: true };
    }

    default:
      throw new Error("Unknown action: " + action);
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
