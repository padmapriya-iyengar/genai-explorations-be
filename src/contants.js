export const DOC_TYPE = {
    EID: "EID",
    PASSPORT: "PASSPORT"
}

export const PROMPTS = {
    PASSPORT:"You are an intelligent document parser. Extract the following information from the scanned image of a passport:\n- full_name\n- id_number\n- nationality\n- dob\n- place_of_birth\n- date_of_issue\n- date_of_expiry\n- gender\n- issuing_country\n- mrz.\n- If a field is not found, return an empty string.\n- Return only the JSON with no extra explanation.\n\n",
    EID: "You are an intelligent document parser. Extract only the English-language information from this Emirates ID document and return it in the following JSON format:\n\n{\n  \"full_name\": \"\",\n  \"nationality\": \"\",\n  \"gender\": \"\",\n  \"date_of_birth\": \"\",\n  \"id_number\": \"\",\n  \"expiry_date\": \"\",\n  \"issue_date\": \"\",\n}\n\nInstructions:\n- Ignore Arabic text.\n- Use date format: YYYY-MM-DD.\n- If a field is not found, return an empty string.\n- Return only the JSON with no extra explanation."
}