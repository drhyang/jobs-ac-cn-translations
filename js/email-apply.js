<!-- ============================================================
     Email application method on job detail pages
     
     KEEP THIS AS A SEPARATE SCRIPT.
     This is the working version that preserves Job Boardly's
     built-in application-click tracking.
     ============================================================ -->
<!-- Customise email application method on job detail pages -->
<script>
(function () {
  function isJobDetailPage() {
    var path = window.location.pathname;

    return /^\/(?:zh-cn\/)?jobs\/[^/]+$/.test(path);
  }

  function isChinesePage() {
    return (
      window.location.pathname.startsWith('/zh-cn/') ||
      document.documentElement.lang === 'zh-CN'
    );
  }

  function setupEmailApply() {
    if (!isJobDetailPage()) {
      return;
    }

    var applyButton = document.getElementById('apply-btn');

    if (!applyButton || applyButton.dataset.emailHandled === 'true') {
      return;
    }

    var href = applyButton.getAttribute('href');

    /*
     * Only customise email-based applications.
     * External application URLs are left unchanged.
     */
    if (!href || !/^mailto:/i.test(href)) {
      return;
    }

    applyButton.dataset.emailHandled = 'true';

    /*
     * Use capture phase so the handler runs before Job Boardly's
     * own click handler.
     *
     * Do NOT use stopImmediatePropagation(), because Job Boardly
     * needs to receive the click for its application-click tracking.
     */
    applyButton.addEventListener('click', function (event) {
      var email = href
        .replace(/^mailto:/i, '')
        .split('?')[0];

      /*
       * Prevent the browser from opening the mail client.
       * Propagation is NOT stopped, so Job Boardly can still
       * process the application click.
       */
      event.preventDefault();

      /*
       * Wait until the current click event has completed before
       * displaying the modal.
       */
      setTimeout(function () {
        showApplicationModal(email);
      }, 0);
    }, true);
  }

  function showApplicationModal(email) {
    var existingModal = document.getElementById(
      'jobs-email-apply-modal'
    );

    if (existingModal) {
      existingModal.remove();
    }

    var chinese = isChinesePage();

    var modal = document.createElement('div');
    modal.id = 'jobs-email-apply-modal';

    var overlay = document.createElement('div');
    overlay.className = 'jobs-email-apply-overlay';

    var dialog = document.createElement('div');
    dialog.className = 'jobs-email-apply-dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute(
      'aria-labelledby',
      'jobs-email-apply-title'
    );

    /* Close button */
    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'jobs-email-apply-close';
    closeButton.setAttribute(
      'aria-label',
      chinese ? '关闭' : 'Close'
    );
    closeButton.textContent = '×';

    /* Title */
    var title = document.createElement('h2');
    title.id = 'jobs-email-apply-title';
    title.textContent = chinese
      ? '如何申请'
      : 'How to Apply';

    /* Instruction */
    var message = document.createElement('p');
    message.textContent = chinese
      ? '请将您的申请材料发送至：'
      : 'Please send your application to:';

    /* Email address - plain text, not a link */
    var emailAddress = document.createElement('div');
    emailAddress.className = 'jobs-email-apply-address';
    emailAddress.textContent = email;

    /* Copy button */
    var copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.className = 'jobs-email-apply-copy';
    copyButton.textContent = chinese
      ? '复制邮箱地址'
      : 'Copy Email Address';

    /* Build modal */
    dialog.appendChild(closeButton);
    dialog.appendChild(title);
    dialog.appendChild(message);
    dialog.appendChild(emailAddress);
    dialog.appendChild(copyButton);

    overlay.appendChild(dialog);
    modal.appendChild(overlay);
    document.body.appendChild(modal);

    /* Close modal */
    function closeModal() {
      modal.remove();
    }

    closeButton.addEventListener('click', closeModal);

    /* Close when clicking outside */
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) {
        closeModal();
      }
    });

    /* Copy email address */
    copyButton.addEventListener('click', function () {
      if (
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        navigator.clipboard.writeText(email).then(function () {
          copyButton.textContent = chinese
            ? '邮箱地址已复制'
            : 'Email Address Copied';

          setTimeout(function () {
            if (document.body.contains(copyButton)) {
              copyButton.textContent = chinese
                ? '复制邮箱地址'
                : 'Copy Email Address';
            }
          }, 2000);
        });
      } else {
        /* Fallback for older browsers */
        var textarea = document.createElement('textarea');

        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';

        document.body.appendChild(textarea);

        textarea.select();
        document.execCommand('copy');

        textarea.remove();

        copyButton.textContent = chinese
          ? '邮箱地址已复制'
          : 'Email Address Copied';

        setTimeout(function () {
          if (document.body.contains(copyButton)) {
            copyButton.textContent = chinese
              ? '复制邮箱地址'
              : 'Copy Email Address';
          }
        }, 2000);
      }
    });

    /* Close with ESC */
    function handleEscape(event) {
      if (event.key === 'Escape') {
        closeModal();

        document.removeEventListener(
          'keydown',
          handleEscape
        );
      }
    }

    document.addEventListener(
      'keydown',
      handleEscape
    );
  }

  /* Initial page load */
  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      setupEmailApply
    );
  } else {
    setupEmailApply();
  }

  /* Job Boardly uses Turbo navigation */
  document.addEventListener(
    'turbo:load',
    setupEmailApply
  );
})();
</script>


<!-- ============================================================
     Email application modal CSS
     KEEP THIS SEPARATE FROM THE SCRIPTS ABOVE.
     ============================================================ -->
<style>
#jobs-email-apply-modal {
  position: fixed;
  inset: 0;
  z-index: 99999;
}

.jobs-email-apply-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
}

.jobs-email-apply-dialog {
  position: relative;
  width: 100%;
  max-width: 480px;
  padding: 28px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.jobs-email-apply-dialog h2 {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 600;
  color: var(
    --token-colors-text-primary,
    #1e293b
  );
}

.jobs-email-apply-dialog p {
  margin: 0 0 12px;
  color: var(
    --token-colors-text-secondary,
    #64748b
  );
}

.jobs-email-apply-address {
  margin-bottom: 20px;
  padding: 12px 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-weight: 500;
  color: var(
    --token-colors-text-primary,
    #1e293b
  );
  word-break: break-word;
  user-select: text;
}

.jobs-email-apply-copy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border: 0;
  border-radius: 6px;
  background: var(--button-color);
  color: var(--button-text-color);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.jobs-email-apply-copy:hover {
  background: var(--button-color-hover);
}

.jobs-email-apply-close {
  position: absolute;
  top: 10px;
  right: 14px;
  padding: 4px 8px;
  border: 0;
  background: transparent;
  color: #64748b;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
}

.jobs-email-apply-close:hover {
  color: #1e293b;
}
</style>
