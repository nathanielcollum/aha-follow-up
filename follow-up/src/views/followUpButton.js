import React, { useState } from "react";

const FollowUpButton = ({ record, onSuccess, onError }) => {
  const [state, setState] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [createdTask, setCreatedTask] = useState(null);

  const createFollowUpTask = async () => {
    // Prevent action if already loading
    if (state === 'loading') return;
    
    try {
      setState('loading');
      setErrorMessage('');

      // Get current user
      const currentUser = aha.user;
      if (!currentUser) {
        throw new Error('Unable to get current user');
      }

      // Get the task name - try different ways to access the feature name
      let featureName;
      
      // Try various properties to get the actual feature name
      if (record.attributes && record.attributes.name) {
        featureName = record.attributes.name;
      } else if (record.name) {
        featureName = record.name;
      } else if (record.title) {
        featureName = record.title;
      } else if (record.displayName) {
        featureName = record.displayName;
      } else if (record.subject) {
        featureName = record.subject;
      } else if (typeof record.getName === 'function') {
        featureName = record.getName();
      } else {
        // Try to get the feature name from the page title as a last resort
        const pageTitle = document.title;
        if (pageTitle && pageTitle !== 'Aha!') {
          // Extract just the feature name part, remove any extra Aha! branding
          featureName = pageTitle.split(' | ')[0] || pageTitle;
        } else {
          // Fallback to reference number if we can't get the actual name
          featureName = record.referenceNum || 'this feature';
        }
      }
      
      const taskName = `Follow up: ${featureName}`;
      
      console.log('Creating task:', taskName);
      
      // Calculate due date (tomorrow) in ISO format
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dueDate = tomorrow.toISOString().split('T')[0]; // "2025-09-17"
      
      // Use the original working approach - Task model with due date as string
      const task = new aha.models.Task({
        name: taskName,
        assignedToUsers: [currentUser.id],
        record: record,
        dueDate: dueDate
      });
      
      // Save the task
      await task.save();

      setCreatedTask(task);
      setState('success');

    } catch (error) {
      console.error('Error creating follow-up task:', error);
      const message = error.message || 'Failed to create follow-up task';
      setErrorMessage(message);
      setState('error');
    }
  };

  const handleRetry = () => {
    createFollowUpTask();
  };

  const getButtonText = () => {
    switch (state) {
      case 'loading':
        return 'Creating...';
      case 'success':
        return 'Follow-up created';
      case 'error':
        return 'Retry';
      default:
        return 'Follow-up';
    }
  };

  const isDisabled = state === 'loading';

  return (
    <div style={{ padding: '8px' }}>
      <aha-button
        size="small"
        kind={state === 'success' ? 'success' : state === 'error' ? 'danger' : 'secondary'}
        onClick={createFollowUpTask}
        style={{ opacity: state === 'loading' ? 0.6 : 1 }}
      >
        {state === 'loading' && (
          <span style={{ marginRight: '8px' }}>⟳</span>
        )}
        {getButtonText()}
      </aha-button>
      
      {state === 'error' && errorMessage && (
        <div style={{ 
          marginTop: '8px', 
          padding: '8px', 
          backgroundColor: '#ffebee', 
          border: '1px solid #f44336',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#c62828'
        }}>
          <strong>Error:</strong> {errorMessage}
          <aha-button
            size="small"
            kind="danger"
            onClick={handleRetry}
            style={{ marginLeft: '8px' }}
          >
            Retry
          </aha-button>
        </div>
      )}

      {state === 'success' && createdTask && (
        <div style={{ 
          marginTop: '8px', 
          padding: '8px', 
          backgroundColor: '#e8f5e8', 
          border: '1px solid #4CAF50',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#2e7d32'
        }}>
          ✓ Follow-up task created: <strong>{createdTask.name}</strong>
          <br />
          <a 
            href={`/tasks/${createdTask.id}`}
            target="_blank"
            style={{ color: '#1976d2', textDecoration: 'underline' }}
          >
            View task →
          </a>
        </div>
      )}
    </div>
  );
};

aha.on("followUpButton", ({ record, fields }, { identifier, settings }) => {
  return <FollowUpButton record={record} />;
});