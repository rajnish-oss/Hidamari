import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'phantombuster/2.0.0 (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Gets a csv file containing agent usage info of the current user's organization.
   *
   */
  getOrgsExportAgentUsage(metadata: types.GetOrgsExportAgentUsageMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/orgs/export-agent-usage', 'get', metadata);
  }

  /**
   * Gets a csv file containing container usage info of the current user's organization.
   *
   */
  getOrgsExportContainerUsage(metadata: types.GetOrgsExportContainerUsageMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/orgs/export-container-usage', 'get', metadata);
  }

  /**
   * Gets the agent groups and order of the current user's organization.
   *
   */
  getOrgsFetchAgentGroups(metadata?: types.GetOrgsFetchAgentGroupsMetadataParam): Promise<FetchResponse<200, types.GetOrgsFetchAgentGroupsResponse200>> {
    return this.core.fetch('/orgs/fetch-agent-groups', 'get', metadata);
  }

  /**
   * Updates the agent groups and order of the current user's organization.
   *
   */
  postOrgsSaveAgentGroups(body: types.PostOrgsSaveAgentGroupsBodyParam, metadata?: types.PostOrgsSaveAgentGroupsMetadataParam): Promise<FetchResponse<200, types.PostOrgsSaveAgentGroupsResponse200>> {
    return this.core.fetch('/orgs/save-agent-groups', 'post', body, metadata);
  }

  /**
   * Gets the current organization.
   *
   */
  getOrgsFetch(metadata?: types.GetOrgsFetchMetadataParam): Promise<FetchResponse<200, types.GetOrgsFetchResponse200>> {
    return this.core.fetch('/orgs/fetch', 'get', metadata);
  }

  /**
   * Gets the current organization's resources and usage.
   *
   */
  getOrgsFetchResources(metadata?: types.GetOrgsFetchResourcesMetadataParam): Promise<FetchResponse<200, types.GetOrgsFetchResourcesResponse200>> {
    return this.core.fetch('/orgs/fetch-resources', 'get', metadata);
  }

  /**
   * Gets the current organization's running containers.
   *
   */
  getOrgsFetchRunningContainers(metadata?: types.GetOrgsFetchRunningContainersMetadataParam): Promise<FetchResponse<200, types.GetOrgsFetchRunningContainersResponse200>> {
    return this.core.fetch('/orgs/fetch-running-containers', 'get', metadata);
  }

  /**
   * Get the organization's CRM access to be able to fetch CRM resources.
   *
   */
  getOrgsFetchCrmAccess(metadata?: types.GetOrgsFetchCrmAccessMetadataParam): Promise<FetchResponse<200, types.GetOrgsFetchCrmAccessResponse200>> {
    return this.core.fetch('/orgs/fetch-crm-access', 'get', metadata);
  }

  /**
   * Gets the current organization's CRM requested resources.
   *
   */
  getOrgsFetchCrmResources(metadata: types.GetOrgsFetchCrmResourcesMetadataParam): Promise<FetchResponse<200, types.GetOrgsFetchCrmResourcesResponse200>> {
    return this.core.fetch('/orgs/fetch-crm-resources', 'get', metadata);
  }

  /**
   * Gets all containers associated to a specified agent.
   *
   */
  getContainersFetchAll(metadata: types.GetContainersFetchAllMetadataParam): Promise<FetchResponse<200, types.GetContainersFetchAllResponse200>> {
    return this.core.fetch('/containers/fetch-all', 'get', metadata);
  }

  /**
   * Gets the result object associated with a container.
   *
   */
  getContainersFetchResultObject(metadata: types.GetContainersFetchResultObjectMetadataParam): Promise<FetchResponse<200, types.GetContainersFetchResultObjectResponse200>> {
    return this.core.fetch('/containers/fetch-result-object', 'get', metadata);
  }

  /**
   * Gets the output of a container.
   *
   */
  getContainersFetchOutput(metadata: types.GetContainersFetchOutputMetadataParam): Promise<FetchResponse<200, types.GetContainersFetchOutputResponse200>> {
    return this.core.fetch('/containers/fetch-output', 'get', metadata);
  }

  /**
   * Gets a container by id.
   *
   */
  getContainersFetch(metadata: types.GetContainersFetchMetadataParam): Promise<FetchResponse<200, types.GetContainersFetchResponse200>> {
    return this.core.fetch('/containers/fetch', 'get', metadata);
  }

  /**
   * Gets the branches associated with the current organization's id.
   *
   */
  getBranchesFetchAll(metadata?: types.GetBranchesFetchAllMetadataParam): Promise<FetchResponse<200, types.GetBranchesFetchAllResponse200>> {
    return this.core.fetch('/branches/fetch-all', 'get', metadata);
  }

  /**
   * Gets the length difference between the staging and release branch of all scripts.
   *
   */
  getBranchesDiff(metadata?: types.GetBranchesDiffMetadataParam): Promise<FetchResponse<200, types.GetBranchesDiffResponse200>> {
    return this.core.fetch('/branches/diff', 'get', metadata);
  }

  /**
   * Adds an agent to the launch queue.
   *
   */
  postAgentsLaunch(body: types.PostAgentsLaunchBodyParam, metadata?: types.PostAgentsLaunchMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/agents/launch', 'post', body, metadata);
  }

  /**
   * Schedules an agent to launch before a specific time.
   *
   */
  postAgentsLaunchSoon(body: types.PostAgentsLaunchSoonBodyParam, metadata?: types.PostAgentsLaunchSoonMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/agents/launch-soon', 'post', body, metadata);
  }

  /**
   * Stops an agent.
   *
   */
  postAgentsStop(body: types.PostAgentsStopBodyParam, metadata?: types.PostAgentsStopMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/agents/stop', 'post', body, metadata);
  }

  /**
   * Disables the automatic launch for all of the agents from the current organization.
   *
   */
  postAgentsUnscheduleAll(metadata?: types.PostAgentsUnscheduleAllMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/agents/unschedule-all', 'post', metadata);
  }

  /**
   * Gets the output of the most recent container of an agent. This API endpoint is
   * specifically designed so that it's easy to get incremental data from an agent.
   *
   */
  getAgentsFetchOutput(metadata: types.GetAgentsFetchOutputMetadataParam): Promise<FetchResponse<200, types.GetAgentsFetchOutputResponse200>> {
    return this.core.fetch('/agents/fetch-output', 'get', metadata);
  }

  /**
   * Creates a new branch.
   *
   */
  postBranchesCreate(body: types.PostBranchesCreateBodyParam, metadata?: types.PostBranchesCreateMetadataParam): Promise<FetchResponse<200, types.PostBranchesCreateResponse200>> {
    return this.core.fetch('/branches/create', 'post', body, metadata);
  }

  /**
   * Deletes a branch by id.
   *
   */
  postBranchesDelete(body: types.PostBranchesDeleteBodyParam, metadata?: types.PostBranchesDeleteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/branches/delete', 'post', body, metadata);
  }

  /**
   * Releases a script branch.
   *
   */
  postBranchesRelease(body: types.PostBranchesReleaseBodyParam, metadata?: types.PostBranchesReleaseMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/branches/release', 'post', body, metadata);
  }

  /**
   * Gets a script by id.
   *
   */
  getScriptsFetch(metadata: types.GetScriptsFetchMetadataParam): Promise<FetchResponse<200, types.GetScriptsFetchResponse200>> {
    return this.core.fetch('/scripts/fetch', 'get', metadata);
  }

  /**
   * Gets all the scripts associated with the current user.
   *
   */
  getScriptsFetchAll(metadata?: types.GetScriptsFetchAllMetadataParam): Promise<FetchResponse<200, types.GetScriptsFetchAllResponse200>> {
    return this.core.fetch('/scripts/fetch-all', 'get', metadata);
  }

  /**
   * Gets the code of a script.
   *
   */
  getScriptsCode(metadata: types.GetScriptsCodeMetadataParam): Promise<FetchResponse<200, types.GetScriptsCodeResponse200>> {
    return this.core.fetch('/scripts/code', 'get', metadata);
  }

  /**
   * Updates the visibility of a script.
   *
   */
  postScriptsVisibility(body: types.PostScriptsVisibilityBodyParam, metadata?: types.PostScriptsVisibilityMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/scripts/visibility', 'post', body, metadata);
  }

  /**
   * Updates the access list of a script.
   *
   */
  postScriptsAccessList(body: types.PostScriptsAccessListBodyParam, metadata?: types.PostScriptsAccessListMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/scripts/access-list', 'post', body, metadata);
  }

  /**
   * Updates or creates a new script. If an id is provided, the corresponding script will be
   * updated. Otherwise, a new script will be created.
   *
   */
  postScriptsSave(body?: types.PostScriptsSaveBodyParam, metadata?: types.PostScriptsSaveMetadataParam): Promise<FetchResponse<200, types.PostScriptsSaveResponse200>> {
    return this.core.fetch('/scripts/save', 'post', body, metadata);
  }

  /**
   * Deletes a script by id.
   *
   */
  postScriptsDelete(body: types.PostScriptsDeleteBodyParam, metadata?: types.PostScriptsDeleteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/scripts/delete', 'post', body, metadata);
  }

  /**
   * Gets an agent by id.
   *
   */
  getAgentsFetch(metadata: types.GetAgentsFetchMetadataParam): Promise<FetchResponse<200, types.GetAgentsFetchResponse200>> {
    return this.core.fetch('/agents/fetch', 'get', metadata);
  }

  /**
   * Gets all agents of the current user's organization.
   *
   */
  getAgentsFetchAll(metadata?: types.GetAgentsFetchAllMetadataParam): Promise<FetchResponse<200, types.GetAgentsFetchAllResponse200>> {
    return this.core.fetch('/agents/fetch-all', 'get', metadata);
  }

  /**
   * Gets all deleted agents of the current user's organization.
   *
   */
  getAgentsFetchDeleted(): Promise<FetchResponse<200, types.GetAgentsFetchDeletedResponse200>> {
    return this.core.fetch('/agents/fetch-deleted', 'get');
  }

  /**
   * Updates or creates a new agent. If an id is provided, the corresponding agent will be
   * updated. Otherwise, a new agent will be created.
   *
   */
  postAgentsSave(body?: types.PostAgentsSaveBodyParam, metadata?: types.PostAgentsSaveMetadataParam): Promise<FetchResponse<200, types.PostAgentsSaveResponse200>> {
    return this.core.fetch('/agents/save', 'post', body, metadata);
  }

  /**
   * Deletes an agent by id.
   *
   */
  postAgentsDelete(body: types.PostAgentsDeleteBodyParam, metadata?: types.PostAgentsDeleteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/agents/delete', 'post', body, metadata);
  }

  /**
   * Solves an hCaptcha challenge. This endpoint will return a 200 status code even if an
   * error occurs. The error will be set in the response body.
   *
   */
  postHcaptcha(body: types.PostHcaptchaBodyParam, metadata?: types.PostHcaptchaMetadataParam): Promise<FetchResponse<200, types.PostHcaptchaResponse200>> {
    return this.core.fetch('/hcaptcha', 'post', body, metadata);
  }

  /**
   * Solves a reCAPTCHA challenge. Supports reCAPTCHA v3 and v2. This endpoint will return a
   * 200 status code even if an error occurs. The error will be set in the response body.
   *
   */
  postRecaptcha(body?: types.PostRecaptchaBodyParam, metadata?: types.PostRecaptchaMetadataParam): Promise<FetchResponse<200, types.PostRecaptchaResponse200>> {
    return this.core.fetch('/recaptcha', 'post', body, metadata);
  }

  /**
   * Get a completion from the AI.
   *
   */
  postAiCompletions(body: types.PostAiCompletionsBodyParam): Promise<FetchResponse<200, types.PostAiCompletionsResponse200>> {
    return this.core.fetch('/ai/completions', 'post', body);
  }

  /**
   * Get a recommendation from the AI.
   *
   */
  postAiAdvice(body: types.PostAiAdviceBodyParam): Promise<FetchResponse<200, types.PostAiAdviceResponse200>> {
    return this.core.fetch('/ai/advice', 'post', body);
  }

  /**
   * Get a task run by the AI.
   *
   */
  postAiTasks(body: types.PostAiTasksBodyParam): Promise<FetchResponse<200, types.PostAiTasksResponse200>> {
    return this.core.fetch('/ai/tasks', 'post', body);
  }

  /**
   * Save many leads - Beta.
   *
   */
  postOrgStorageLeadsSaveMany(body: types.PostOrgStorageLeadsSaveManyBodyParam, metadata?: types.PostOrgStorageLeadsSaveManyMetadataParam): Promise<FetchResponse<200, types.PostOrgStorageLeadsSaveManyResponse200>> {
    return this.core.fetch('/org-storage/leads/save-many', 'post', body, metadata);
  }

  /**
   * Save one lead - Beta.
   *
   */
  postOrgStorageLeadsSave(body: types.PostOrgStorageLeadsSaveBodyParam, metadata?: types.PostOrgStorageLeadsSaveMetadataParam): Promise<FetchResponse<200, types.PostOrgStorageLeadsSaveResponse200>> {
    return this.core.fetch('/org-storage/leads/save', 'post', body, metadata);
  }

  /**
   * Delete many leads.
   *
   */
  postOrgStorageLeadsDeleteMany(body: types.PostOrgStorageLeadsDeleteManyBodyParam, metadata?: types.PostOrgStorageLeadsDeleteManyMetadataParam): Promise<FetchResponse<200, types.PostOrgStorageLeadsDeleteManyResponse200>> {
    return this.core.fetch('/org-storage/leads/delete-many', 'post', body, metadata);
  }

  /**
   * Fetch leads by their list id.
   *
   */
  postOrgStorageLeadsByListListid(body: types.PostOrgStorageLeadsByListListidBodyParam, metadata: types.PostOrgStorageLeadsByListListidMetadataParam): Promise<FetchResponse<200, types.PostOrgStorageLeadsByListListidResponse200>>;
  postOrgStorageLeadsByListListid(metadata: types.PostOrgStorageLeadsByListListidMetadataParam): Promise<FetchResponse<200, types.PostOrgStorageLeadsByListListidResponse200>>;
  postOrgStorageLeadsByListListid(body?: types.PostOrgStorageLeadsByListListidBodyParam | types.PostOrgStorageLeadsByListListidMetadataParam, metadata?: types.PostOrgStorageLeadsByListListidMetadataParam): Promise<FetchResponse<200, types.PostOrgStorageLeadsByListListidResponse200>> {
    return this.core.fetch('/org-storage/leads/by-list/{listId}', 'post', body, metadata);
  }

  /**
   * Save a list - Beta.
   * For more information, see the [Creating and updating leads lists using
   * filters](https://hub.phantombuster.com/docs/creating-and-updating-leads-lists-using-filters)
   * page in the Developer Guides.
   *
   */
  postOrgStorageListsSave(metadata?: types.PostOrgStorageListsSaveMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/org-storage/lists/save', 'post', metadata);
  }

  /**
   * Delete a list - Beta.
   *
   */
  postOrgStorageListsDelete(body: types.PostOrgStorageListsDeleteBodyParam, metadata?: types.PostOrgStorageListsDeleteMetadataParam): Promise<FetchResponse<200, types.PostOrgStorageListsDeleteResponse200>> {
    return this.core.fetch('/org-storage/lists/delete', 'post', body, metadata);
  }

  /**
   * Get all the lists - Beta.
   *
   */
  getOrgStorageListsFetchAll(metadata?: types.GetOrgStorageListsFetchAllMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/org-storage/lists/fetch-all', 'get', metadata);
  }

  /**
   * Get one list by ID - Beta.
   *
   */
  getOrgStorageListsFetch(metadata: types.GetOrgStorageListsFetchMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/org-storage/lists/fetch', 'get', metadata);
  }

  /**
   * Save one lead object.
   *
   */
  postOrgStorageLeadsObjectsSave(body: types.PostOrgStorageLeadsObjectsSaveBodyParam): Promise<FetchResponse<200, types.PostOrgStorageLeadsObjectsSaveResponse200>> {
    return this.core.fetch('/org-storage/leads-objects/save', 'post', body);
  }

  /**
   * Save many lead objects.
   *
   */
  postOrgStorageLeadsObjectsSaveMany(body: types.PostOrgStorageLeadsObjectsSaveManyBodyParam): Promise<FetchResponse<200, types.PostOrgStorageLeadsObjectsSaveManyResponse200>> {
    return this.core.fetch('/org-storage/leads-objects/save-many', 'post', body);
  }

  /**
   * Delete one or more leads objects.
   *
   */
  postOrgStorageLeadsObjectsDelete(body?: types.PostOrgStorageLeadsObjectsDeleteBodyParam): Promise<FetchResponse<200, types.PostOrgStorageLeadsObjectsDeleteResponse200>> {
    return this.core.fetch('/org-storage/leads-objects/delete', 'post', body);
  }

  /**
   * Search leads objects.
   *
   */
  postOrgStorageLeadsObjectsSearch(): Promise<FetchResponse<200, types.PostOrgStorageLeadsObjectsSearchResponse200>> {
    return this.core.fetch('/org-storage/leads-objects/search', 'post');
  }

  /**
   * Save one company object.
   *
   */
  postOrgStorageCompaniesObjectsSave(body: types.PostOrgStorageCompaniesObjectsSaveBodyParam): Promise<FetchResponse<200, types.PostOrgStorageCompaniesObjectsSaveResponse200>> {
    return this.core.fetch('/org-storage/companies-objects/save', 'post', body);
  }

  /**
   * Save many company objects.
   *
   */
  postOrgStorageCompaniesObjectsSaveMany(body?: types.PostOrgStorageCompaniesObjectsSaveManyBodyParam): Promise<FetchResponse<200, types.PostOrgStorageCompaniesObjectsSaveManyResponse200>> {
    return this.core.fetch('/org-storage/companies-objects/save-many', 'post', body);
  }

  /**
   * Generate identity token.
   *
   */
  postIdentitiesGenerateToken(): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/identities/generate-token', 'post');
  }

  /**
   * Save identity.
   *
   */
  postIdentitiesSaveWithToken(body: types.PostIdentitiesSaveWithTokenBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/identities/save-with-token', 'post', body);
  }

  /**
   * Save the identity event.
   *
   */
  postIdentitiesEventsSave(body: types.PostIdentitiesEventsSaveBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/identities/events/save', 'post', body);
  }

  /**
   * Search identity event.
   *
   */
  postIdentitiesEventsSearch(body: types.PostIdentitiesEventsSearchBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/identities/events/search', 'post', body);
  }

  /**
   * Perform a search using brightdata.
   *
   */
  getBrightdataSerp(body: types.GetBrightdataSerpBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/brightdata/serp', 'get', body);
  }

  /**
   * Save new contacts to CRM.
   *
   */
  postOrgsSaveCrmContact(body: types.PostOrgsSaveCrmContactBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/orgs/save-crm-contact', 'post', body);
  }

  /**
   * Retrieves the country of the IP address.
   *
   */
  getLocationIp(metadata: types.GetLocationIpMetadataParam): Promise<FetchResponse<200, types.GetLocationIpResponse200>> {
    return this.core.fetch('/location/ip', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { GetAgentsFetchAllMetadataParam, GetAgentsFetchAllResponse200, GetAgentsFetchDeletedResponse200, GetAgentsFetchMetadataParam, GetAgentsFetchOutputMetadataParam, GetAgentsFetchOutputResponse200, GetAgentsFetchResponse200, GetBranchesDiffMetadataParam, GetBranchesDiffResponse200, GetBranchesFetchAllMetadataParam, GetBranchesFetchAllResponse200, GetBrightdataSerpBodyParam, GetContainersFetchAllMetadataParam, GetContainersFetchAllResponse200, GetContainersFetchMetadataParam, GetContainersFetchOutputMetadataParam, GetContainersFetchOutputResponse200, GetContainersFetchResponse200, GetContainersFetchResultObjectMetadataParam, GetContainersFetchResultObjectResponse200, GetLocationIpMetadataParam, GetLocationIpResponse200, GetOrgStorageListsFetchAllMetadataParam, GetOrgStorageListsFetchMetadataParam, GetOrgsExportAgentUsageMetadataParam, GetOrgsExportContainerUsageMetadataParam, GetOrgsFetchAgentGroupsMetadataParam, GetOrgsFetchAgentGroupsResponse200, GetOrgsFetchCrmAccessMetadataParam, GetOrgsFetchCrmAccessResponse200, GetOrgsFetchCrmResourcesMetadataParam, GetOrgsFetchCrmResourcesResponse200, GetOrgsFetchMetadataParam, GetOrgsFetchResourcesMetadataParam, GetOrgsFetchResourcesResponse200, GetOrgsFetchResponse200, GetOrgsFetchRunningContainersMetadataParam, GetOrgsFetchRunningContainersResponse200, GetScriptsCodeMetadataParam, GetScriptsCodeResponse200, GetScriptsFetchAllMetadataParam, GetScriptsFetchAllResponse200, GetScriptsFetchMetadataParam, GetScriptsFetchResponse200, PostAgentsDeleteBodyParam, PostAgentsDeleteMetadataParam, PostAgentsLaunchBodyParam, PostAgentsLaunchMetadataParam, PostAgentsLaunchSoonBodyParam, PostAgentsLaunchSoonMetadataParam, PostAgentsSaveBodyParam, PostAgentsSaveMetadataParam, PostAgentsSaveResponse200, PostAgentsStopBodyParam, PostAgentsStopMetadataParam, PostAgentsUnscheduleAllMetadataParam, PostAiAdviceBodyParam, PostAiAdviceResponse200, PostAiCompletionsBodyParam, PostAiCompletionsResponse200, PostAiTasksBodyParam, PostAiTasksResponse200, PostBranchesCreateBodyParam, PostBranchesCreateMetadataParam, PostBranchesCreateResponse200, PostBranchesDeleteBodyParam, PostBranchesDeleteMetadataParam, PostBranchesReleaseBodyParam, PostBranchesReleaseMetadataParam, PostHcaptchaBodyParam, PostHcaptchaMetadataParam, PostHcaptchaResponse200, PostIdentitiesEventsSaveBodyParam, PostIdentitiesEventsSearchBodyParam, PostIdentitiesSaveWithTokenBodyParam, PostOrgStorageCompaniesObjectsSaveBodyParam, PostOrgStorageCompaniesObjectsSaveManyBodyParam, PostOrgStorageCompaniesObjectsSaveManyResponse200, PostOrgStorageCompaniesObjectsSaveResponse200, PostOrgStorageLeadsByListListidBodyParam, PostOrgStorageLeadsByListListidMetadataParam, PostOrgStorageLeadsByListListidResponse200, PostOrgStorageLeadsDeleteManyBodyParam, PostOrgStorageLeadsDeleteManyMetadataParam, PostOrgStorageLeadsDeleteManyResponse200, PostOrgStorageLeadsObjectsDeleteBodyParam, PostOrgStorageLeadsObjectsDeleteResponse200, PostOrgStorageLeadsObjectsSaveBodyParam, PostOrgStorageLeadsObjectsSaveManyBodyParam, PostOrgStorageLeadsObjectsSaveManyResponse200, PostOrgStorageLeadsObjectsSaveResponse200, PostOrgStorageLeadsObjectsSearchResponse200, PostOrgStorageLeadsSaveBodyParam, PostOrgStorageLeadsSaveManyBodyParam, PostOrgStorageLeadsSaveManyMetadataParam, PostOrgStorageLeadsSaveManyResponse200, PostOrgStorageLeadsSaveMetadataParam, PostOrgStorageLeadsSaveResponse200, PostOrgStorageListsDeleteBodyParam, PostOrgStorageListsDeleteMetadataParam, PostOrgStorageListsDeleteResponse200, PostOrgStorageListsSaveMetadataParam, PostOrgsSaveAgentGroupsBodyParam, PostOrgsSaveAgentGroupsMetadataParam, PostOrgsSaveAgentGroupsResponse200, PostOrgsSaveCrmContactBodyParam, PostRecaptchaBodyParam, PostRecaptchaMetadataParam, PostRecaptchaResponse200, PostScriptsAccessListBodyParam, PostScriptsAccessListMetadataParam, PostScriptsDeleteBodyParam, PostScriptsDeleteMetadataParam, PostScriptsSaveBodyParam, PostScriptsSaveMetadataParam, PostScriptsSaveResponse200, PostScriptsVisibilityBodyParam, PostScriptsVisibilityMetadataParam } from './types';
